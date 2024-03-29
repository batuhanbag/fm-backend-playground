import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import mongoose from 'mongoose';
import { Observable, switchMap } from 'rxjs';

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const apiKey = req.get('apiKey');

    if (!apiKey) {
      throw new Error('API anahtarı bulunamadı');
    }

    const targetDBName = apiKey;

    return next.handle().pipe(
      switchMap(() => {
        const newDB = mongoose.connection.useDb(targetDBName);
        console.log(newDB.name, 'mongoose.connection.db.databaseName');
        console.log(mongoose.modelNames(), 'Interceptor DB NAME');
        return next.handle();
      })
    );
  }
}
