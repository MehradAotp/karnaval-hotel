import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AccommodationType } from '../enums/accommodations.enum';
import { BuildingType } from '../enums/building-type.enum';
import { Stairs } from '../enums/stairs.enum';
import { Distance } from '../enums/distance.enum';
import { LocationType } from '../enums/location-type.enum';
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

@Schema({ timestamps: true })
export class House extends Document {
  @Prop({
    type: String,
    enum: Object.values(AccommodationType),
    required: true,
  })
  accommodationType: AccommodationType;

  @Prop({ type: String, enum: Object.values(BuildingType), required: true })
  buildingType: BuildingType;

  @Prop({ type: String, required: true })
  floor: string;

  @Prop({ type: String, enum: Object.values(Stairs), required: true })
  stairs: Stairs;

  @Prop({ type: Number, required: true })
  area: number;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  neighborhood: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, enum: Object.values(Distance), required: true })
  dirtRoadDistance: Distance;

  @Prop({ type: String, enum: Object.values(LocationType), required: true })
  locationType: LocationType;

  @Prop({ type: String, enum: Object.values(Distance), required: true })
  supermarketWalkingDistance: Distance;

  @Prop({ type: String, enum: Object.values(Distance), required: true })
  supermarketDrivingDistance: Distance;

  @Prop({ type: [String], enum: Object.values(SharedSpaces), required: true })
  sharedSpaces: SharedSpaces[];

  @Prop({ type: Number, required: true })
  standardCapacity: number;

  @Prop({ type: Number, required: true })
  maxCapacity: number;

  @Prop({ type: Number, required: true })
  midWeekPrice: number;

  @Prop({ type: Number, required: true })
  weekendPrice: number;

  @Prop({ type: Number, required: true })
  peakSeasonPrice: number;

  @Prop({ type: Number, required: true })
  extraPersonPrice: number;

  @Prop({ type: Number, required: true })
  extraPersonPeakPrice: number;

  @Prop({ type: Number, required: true })
  longTermDiscountDays: number;

  @Prop({ type: Number, required: true })
  longTermDiscountPercentage: number;

  @Prop({
    type: String,
    enum: Object.values(CancellationPolicy),
    required: true,
  })
  cancellationPolicy: CancellationPolicy;

  @Prop({
    type: [String],
    enum: Object.values(AccommodationSpaces),
    required: true,
  })
  accommodationSpaces: AccommodationSpaces[];

  @Prop({ type: [String], enum: Object.values(BasicAmenities), required: true })
  basicAmenities: BasicAmenities[];

  @Prop({ type: [String], enum: Object.values(HeatingSystem), required: true })
  heatingSystem: HeatingSystem[];

  @Prop({ type: [String], enum: Object.values(CoolingSystem), required: true })
  coolingSystem: CoolingSystem[];

  @Prop({
    type: [String],
    enum: Object.values(KitchenAmenities),
    required: true,
  })
  kitchenAmenities: KitchenAmenities[];

  @Prop({
    type: [String],
    enum: Object.values(ComfortAmenities),
    required: true,
  })
  comfortAmenities: ComfortAmenities[];

  @Prop({ type: [String], enum: Object.values(HygienePack), required: true })
  hygienePack: HygienePack[];

  @Prop({
    type: [String],
    enum: Object.values(SpecialAmenities),
    required: true,
  })
  specialAmenities: SpecialAmenities[];

  @Prop({ type: [String], enum: Object.values(Services), required: true })
  services: Services[];

  @Prop({
    type: [String],
    enum: Object.values(SafetyAmenities),
    required: true,
  })
  safetyAmenities: SafetyAmenities[];

  @Prop({ type: [String], enum: Object.values(CCTV), required: true })
  cctv: CCTV[];
}

export const HouseSchema = SchemaFactory.createForClass(House);
