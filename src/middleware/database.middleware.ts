/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import mongoose, { ConnectOptions, Model, mongo } from 'mongoose'; // Mongoose eklentisini ekliyoruz
import { SubAppModule } from 'src/app.module';

@Injectable()
export class DatabaseMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.get('apiKey');
    const dbURL = `mongodb+srv://batu:YQsoxSONGkbEN4MU@cluster0.0okex.mongodb.net/${apiKey}`;
    console.log(
      'Before DB Middleware Current DB => ',
      mongoose.connection.name
    );
    console.log('Database Middleware => ', dbURL);
    const targetDBName = apiKey;
    const currentDBName = mongoose.connection.name;

    if (currentDBName === targetDBName) {
      return next();
    }

    try {
      await SubAppModule.forRoot(dbURL);

      if (mongoose.connection.readyState === 1) {
        console.log('Database connected');
        console.log(
          'After DB Middleware Current DB => ',
          mongoose.connection.name
        );
        next();
      } else {
        throw new Error('Database connection failed');
      }
    } catch (error) {
      console.error('Database connection error:', error);
      next(error);
    }
  }
}
