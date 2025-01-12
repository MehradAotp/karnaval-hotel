import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HouseTemporarily } from '../database/house-temporarily.schema';
import { CreateTemporaryDto } from '../dto/create-temporarily.dto';
import { House } from '../database/house.schema';
import { FinalizeTemporaryDto } from '../dto/output.dto';
import { CreateAccommodationDto } from '../dto/create-accommodation.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class TemporaryService {
  constructor(
    @InjectModel(HouseTemporarily.name)
    private houseTemporarilyModel: Model<HouseTemporarily>,
    @InjectModel(House.name) private houseModel: Model<House>,
  ) {}

  async generateTemporaryId(): Promise<string> {
    const temporaryData = new this.houseTemporarilyModel();
    const savedData = await temporaryData.save();
    return savedData._id.toString();
  }

  async savePartialData(
    temporarilyID: string,
    data: Partial<CreateTemporaryDto>,
  ): Promise<void> {
    const houseTemporarily =
      await this.houseTemporarilyModel.findById(temporarilyID);

    if (houseTemporarily) {
      houseTemporarily.data = { ...houseTemporarily.data, ...data };
      await houseTemporarily.save();
    } else {
      throw new Error('Temporarily ID not found');
    }
  }

  async finalizeAccommodation(
    temporarilyID: string,
  ): Promise<FinalizeTemporaryDto> {
    try {
      const houseTemporarily =
        await this.houseTemporarilyModel.findById(temporarilyID);

      if (!houseTemporarily) {
        throw new NotFoundException(
          `No temporary accommodation found for ID: ${temporarilyID}`,
        );
      }

      if (!houseTemporarily.data) {
        throw new NotFoundException(
          `No data found for the temporary accommodation with ID: ${temporarilyID}`,
        );
      }

      const validationErrors = await this.validateData(houseTemporarily.data);

      if (validationErrors.length > 0) {
        throw new BadRequestException(
          `Validation failed:\n${validationErrors.map((err) => `- ${err}`).join('\n')}`,
        );
      }

      const newHouse = new this.houseModel(houseTemporarily.data);

      await newHouse.save();

      await this.houseTemporarilyModel.deleteOne({ _id: temporarilyID });

      return this.docToDto(newHouse);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while finalizing the accommodation. Please try again later.',
      );
    }
  }
  private async validateData(data: any): Promise<string[]> {
    const instance = plainToClass(CreateAccommodationDto, data);

    const errors = await validate(instance);

    return errors.map((error) =>
      Object.values(error.constraints || {}).join(', '),
    );
  }
  private docToDto(houseDocument: House): Promise<FinalizeTemporaryDto> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, ...filteredData } = houseDocument.toObject();
    const house: CreateAccommodationDto =
      filteredData as CreateAccommodationDto;
    return Promise.resolve({
      message: 'Data has been successfully finalized',
      house: house,
    });
  }
}
