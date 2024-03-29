import { Injectable } from '@nestjs/common';
import { ApiKeyRepository } from './api-key.repository';
import { DeleteResult } from 'mongodb';
import mongoose from 'mongoose';

@Injectable()
export class ApiKeyService {
  constructor(private readonly apiKeyRepository: ApiKeyRepository) {}

  async getAPIKeys() {
    return await this.apiKeyRepository.findAll();
  }

  async getAPIKey(id: string) {
    return await this.apiKeyRepository.findOne(id);
  }

  async createAPIKey() {
    console.log('Create API Service');
    console.log(mongoose.modelNames(), 'Service DB NAME');
    return await this.apiKeyRepository.create();
  }

  async deleteAPIKey(id: string): Promise<DeleteResult> {
    return await this.apiKeyRepository.delete(id);
  }
}
