/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Module,
  MiddlewareConsumer,
  NestModule,
  DynamicModule,
  Global
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { DatabaseMiddleware } from './middleware/database.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import databaseConfig from './config/database.config';
import { ApiKeyModule } from './api-key/api-key.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseInterceptor } from './database/database.interceptor';
import { DatabaseService } from './database/database.service';

@Global()
@Module({
  controllers: [AppController],
  providers: [AppService, DatabaseService]
})
export class SubAppModule {
  static forRoot(databaseUri: string): DynamicModule {
    const mongooseModuleOptions: MongooseModuleOptions = {
      uri: databaseUri
    };

    return {
      module: AppModule,
      imports: [
        MongooseModule.forRootAsync({
          useFactory: () => mongooseModuleOptions
        })
      ]
    };
  }
}

@Global()
@Module({
  imports: [
    AuthModule,
    ApiKeyModule,
    // MongooseModule.forRoot(
    //   'mongodb+srv://batu:YQsoxSONGkbEN4MU@cluster0.0okex.mongodb.net/test'
    // ),
    SubAppModule.forRoot(
      'mongodb+srv://batu:YQsoxSONGkbEN4MU@cluster0.0okex.mongodb.net/test'
    )
  ],

  controllers: [AppController],
  providers: [AppService, DatabaseService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const middlewares = [AuthMiddleware, DatabaseMiddleware];
    middlewares.forEach(middleware => {
      consumer.apply(middleware).forRoutes('*');
    });
  }
}
