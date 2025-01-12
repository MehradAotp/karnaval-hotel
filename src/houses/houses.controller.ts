import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HouseService } from './houses.service';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';

@Controller('house')
@ApiTags('house')
export class HousesController {
  constructor(private readonly service: HouseService) {}

  @Post('create')
  async create(@Body() input: CreateAccommodationDto) {
    return this.service.create(input);
  }
}
