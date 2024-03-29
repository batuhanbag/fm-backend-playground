import { DeleteResult } from 'mongodb';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put
} from '@nestjs/common';
import { APIKey } from './interface/api-key.interface';
import { ApiKeyService } from './api-key.service';
import mongoose from 'mongoose';

@Controller('api-key')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Get()
  getAPIKeys(): Promise<APIKey[]> {
    return this.apiKeyService.getAPIKeys();
  }

  @Get(':id')
  getAPIKey(@Param('id') id: string): Promise<APIKey> {
    return this.apiKeyService.getAPIKey(id);
  }

  @Post()
  createAPIKey() {
    return this.apiKeyService.createAPIKey();
  }

  @Delete(':id')
  deleteAPIKey(@Param('id') id: string): Promise<DeleteResult> {
    return this.apiKeyService.deleteAPIKey(id);
  }
}
