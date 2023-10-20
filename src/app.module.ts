/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { DatabaseMiddleware } from './middleware/database.middleware';
import { User, UserSchema } from './users/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './users/user.service';
import { UserController } from './users/user.controller';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost/nestjs-mongodb',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],

  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const middlewares = [AuthMiddleware, DatabaseMiddleware];
    middlewares.forEach((middleware) => {
      consumer.apply(middleware).forRoutes('*');
    });
  }
}
