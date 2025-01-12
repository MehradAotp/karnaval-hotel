import { PartialType } from '@nestjs/mapped-types';
import { CreateAccommodationDto } from './create-accommodation.dto';

export class UpdateHouseDto extends PartialType(CreateAccommodationDto) {}
