import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HouseService } from './houses.service';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { TemporaryService } from './services/temporary.service';
import { CreateTemporaryDto } from './dto/create-temporarily.dto';
import { FinalizeTemporaryDto } from './dto/output.dto';

@Controller('house')
@ApiTags('house')
export class HousesController {
  constructor(
    private readonly service: HouseService,
    private readonly temporaryService: TemporaryService,
  ) {}

  @Post('create')
  async create(@Body() input: CreateAccommodationDto) {
    return this.service.create(input);
  }

  @Get('generate-id')
  async generateId(): Promise<string> {
    return this.temporaryService.generateTemporaryId();
  }

  @Post('save-partial/:id')
  async savePartialData(
    @Param('id') temporarilyID: string,
    @Body() data: CreateTemporaryDto,
  ): Promise<void> {
    await this.temporaryService.savePartialData(temporarilyID, data);
  }

  @Post('finalize/:id')
  async finalizeAccommodation(
    @Param('id') temporarilyID: string,
  ): Promise<FinalizeTemporaryDto> {
    const newHouse =
      await this.temporaryService.finalizeAccommodation(temporarilyID);
    return newHouse;
  }
}
