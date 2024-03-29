import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri: 'mongodb+srv://batu:YQsoxSONGkbEN4MU@cluster0.0okex.mongodb.net/test'
}));
