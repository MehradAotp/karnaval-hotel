import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { AccommodationType } from '../enums/accommodations.enum';
import { BuildingType } from '../enums/building-type.enum';
import { Distance } from '../enums/distance.enum';
import { LocationType } from '../enums/location-type.enum';
import { Stairs } from '../enums/stairs.enum';
import { AccommodationSpaces } from '../enums/accommodation-spaces.enum';
import { BasicAmenities } from '../enums/basic-amenities.enum';
import { CCTV } from '../enums/cctv.enum';
import { ComfortAmenities } from '../enums/comfort-amenities.enum';
import { CoolingSystem } from '../enums/cooling-system.enum';
import { HeatingSystem } from '../enums/heating-system.enum';
import { HygienePack } from '../enums/hygiene-pack.enum';
import { KitchenAmenities } from '../enums/kitchen-amenities.enum';
import { SafetyAmenities } from '../enums/safety-amenities.enum';
import { Services } from '../enums/services.enum';
import { SpecialAmenities } from '../enums/special-amenities.enum';
import { CancellationPolicy } from '../enums/cancellation-policy.enum';
import { SharedSpaces } from '../enums/shared-spaces.enum';

export class CreateAccommodationDto {
  @IsEnum(AccommodationType)
  @IsNotEmpty()
  accommodationType: AccommodationType;

  @IsEnum(BuildingType)
  @IsNotEmpty()
  buildingType: BuildingType;

  @IsString()
  @IsNotEmpty()
  floor: string;

  @IsEnum(Stairs)
  @IsNotEmpty()
  stairs: Stairs;

  @IsNumber()
  @IsNotEmpty()
  area: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEnum(Distance)
  @IsNotEmpty()
  dirtRoadDistance: Distance;

  @IsEnum(LocationType)
  @IsNotEmpty()
  locationType: LocationType;

  @IsEnum(Distance)
  @IsNotEmpty()
  supermarketWalkingDistance: Distance;

  @IsEnum(Distance)
  @IsNotEmpty()
  supermarketDrivingDistance: Distance;

  @IsArray()
  @IsNotEmpty()
  sharedSpaces: SharedSpaces[];

  @IsNumber()
  @IsNotEmpty()
  standardCapacity: number;

  @IsNumber()
  @IsNotEmpty()
  maxCapacity: number;

  @IsNumber()
  @IsNotEmpty()
  midWeekPrice: number;

  @IsNumber()
  @IsNotEmpty()
  weekendPrice: number;

  @IsNumber()
  @IsNotEmpty()
  peakSeasonPrice: number;

  @IsNumber()
  @IsNotEmpty()
  extraPersonPrice: number;

  @IsNumber()
  @IsNotEmpty()
  extraPersonPeakPrice: number;

  @IsNumber()
  @IsNotEmpty()
  longTermDiscountDays: number;

  @IsNumber()
  @IsNotEmpty()
  longTermDiscountPercentage: number;

  @IsEnum(CancellationPolicy)
  @IsNotEmpty()
  cancellationPolicy: CancellationPolicy;

  @IsArray()
  @IsNotEmpty()
  accommodationSpaces: AccommodationSpaces[];

  @IsArray()
  @IsNotEmpty()
  basicAmenities: BasicAmenities[];

  @IsArray()
  @IsNotEmpty()
  heatingSystem: HeatingSystem[];

  @IsArray()
  @IsNotEmpty()
  coolingSystem: CoolingSystem[];

  @IsArray()
  @IsNotEmpty()
  kitchenAmenities: KitchenAmenities[];

  @IsArray()
  @IsNotEmpty()
  comfortAmenities: ComfortAmenities[];

  @IsArray()
  @IsNotEmpty()
  hygienePack: HygienePack[];

  @IsArray()
  @IsNotEmpty()
  specialAmenities: SpecialAmenities[];

  @IsArray()
  @IsNotEmpty()
  services: Services[];

  @IsArray()
  @IsNotEmpty()
  safetyAmenities: SafetyAmenities[];

  @IsArray()
  @IsNotEmpty()
  cctv: CCTV[];
}
