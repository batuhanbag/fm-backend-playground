/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import mongoose, { ConnectOptions } from 'mongoose'; // Mongoose eklentisini ekliyoruz

@Injectable()
export class DatabaseMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.get('apiKey');

    const dbURL = `mongodb+srv://fashionmetricservice:7Q3rnyKFw0weoqHV@cluster0.jkuxkii.mongodb.net/${apiKey}?retryWrites=true&w=majority`;

    try {
      await mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);

      next();
    } catch (error) {
      console.log(error, 'ERrror');
      next(error);
    }
  }
}
