import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { APIKey } from '../interface/api-key.interface';

export type ApiKeyDocument = HydratedDocument<APIKey>;

@Schema({ timestamps: true })
export class ApiKey {
  @Prop({ required: true })
  key: string;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
