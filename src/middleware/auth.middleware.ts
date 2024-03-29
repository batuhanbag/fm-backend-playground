import {
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common';
import mongoose from 'mongoose';
import * as passport from 'passport';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(mongoose.modelNames(), 'AuthMiddleware DB NAME');
    console.log('Auth Middleware');
    passport.authenticate(
      'headerapikey',
      { session: false, failureRedirect: '/api/unauthorized' },
      value => {
        if (value) {
          mongoose.connection.close(true).then(() => {
            console.log('Database connection closed');
            next();
          });
        } else {
          throw new UnauthorizedException();
        }
      }
    )(req, res, next);
  }
}
