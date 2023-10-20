/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose'; // Mongoose eklentisini ekliyoruz

@Injectable()
export class DatabaseMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.get('apiKey');

    const dbURL = `mongodb+srv://batu:BVSIlUrEPQapNiSO@cluster0.0okex.mongodb.net/${apiKey}?retryWrites=true&w=majority`;

    try {
      await mongoose.connect(dbURL, {
        //@ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log(
        mongoose.connection.readyState === 1,
        'mongoose.connection.readyState === 1',
      );

      next();
    } catch (error) {
      console.log(error, 'ERrror');
      next(error);
    }
  }
}
