import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { CreateAccommodationDto } from '../dto/create-accommodation.dto';

@Schema({ timestamps: true })
export class HouseTemporarily extends Document {
  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  data?: Partial<CreateAccommodationDto>;
}

export const HouseTemporarilySchema =
  SchemaFactory.createForClass(HouseTemporarily);
