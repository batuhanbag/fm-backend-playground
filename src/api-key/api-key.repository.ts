import { APIKey } from './interface/api-key.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import {
  ApiKey as ApiKeySchema,
  ApiKeyDocument
} from './schema/api-key.schema';
import { DeleteResult } from 'mongodb';
import { generateApiKey } from './helpers/api-key.helpers';
import { DataBases } from 'src/database/database';

export class ApiKeyRepository {
  constructor(
    @InjectModel(ApiKeySchema.name)
    private apiKeyModel: Model<ApiKeyDocument>
  ) {}

  async create() {
    const generatedKey = generateApiKey();

    const newCode = new this.apiKeyModel({ key: generatedKey });
    console.log('Create API Repository ');

    return await newCode.save().catch(e => {
      console.log(e, 'ERROR');
      throw new NotFoundException('An error occured while saving new api key');
    });
  }

  async findAll() {
    return await this.apiKeyModel.find().exec();
  }

  async findOne(id: string) {
    return await this.apiKeyModel.findById(id).exec();
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.apiKeyModel.deleteOne({ _id: id }).exec();
  }
}
