/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { DatabaseMiddleware } from './middleware/database.middleware';
import { LikeItemModule } from './like-item/like-item.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './config/database.config'; // Yukarıda oluşturduğunuz yapılandırma

@Module({
  imports: [
    AuthModule,
    LikeItemModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const middlewares = [AuthMiddleware, DatabaseMiddleware];
    middlewares.forEach((middleware) => {
      consumer.apply(middleware).forRoutes('*');
    });
  }
}
