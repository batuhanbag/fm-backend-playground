import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ApiKeySchema } from './schema/api-key.schema';
import { ApiKeyService } from './api-key.service';
import { ApiKeyRepository } from './api-key.repository';
import { ApiKeyController } from './api-key.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ApiKey', schema: ApiKeySchema }])
  ],
  providers: [ApiKeyService, ApiKeyRepository],
  controllers: [ApiKeyController],
  exports: [ApiKeyService]
})
export class ApiKeyModule {}
