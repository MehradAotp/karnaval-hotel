import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { House } from './database/house.schema';
import { Model } from 'mongoose';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';

@Injectable()
export class HouseService {
  constructor(@InjectModel(House.name) private HouseModel: Model<House>) {}

  async create(input: CreateAccommodationDto) {
    const doc = new this.HouseModel(input);
    return doc.save();
  }

  async findHouseById(id) {
    const doc = await this.HouseModel.findById(id).exec();
    return doc;
  }
}
