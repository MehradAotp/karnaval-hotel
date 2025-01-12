import { Module } from '@nestjs/common';
import { HousesController } from './houses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { House, HouseSchema } from './database/house.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { HouseService } from './houses.service';
import {
  HouseTemporarily,
  HouseTemporarilySchema,
} from './database/house-temporarily.schema';
import { TemporaryService } from './services/temporary.service';
import { PriceService } from './services/price.service';

@Module({
  imports: [
    NestjsFormDataModule,
    MongooseModule.forFeature([
      { name: House.name, schema: HouseSchema },
      { name: HouseTemporarily.name, schema: HouseTemporarilySchema },
    ]),
  ],
  controllers: [HousesController],
  providers: [HouseService, TemporaryService, PriceService],
})
export class HousesModule {}
