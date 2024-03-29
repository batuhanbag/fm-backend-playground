import { Injectable } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose, { Connection } from 'mongoose';

@Injectable()
export class DatabaseService {
  private connections: Map<string, Connection> = new Map<string, Connection>();

  getConnection(apiKey: string): Connection {
    if (!this.connections.has(apiKey)) {
      const dbURL = `mongodb+srv://batu:YQsoxSONGkbEN4MU@cluster0.0okex.mongodb.net/${apiKey}?retryWrites=true&w=majority&appName=Cluster0`;
      const newConnection = mongoose.createConnection(dbURL);
      this.connections.set(apiKey, newConnection);
    }
    return this.connections.get(apiKey);
  }
}
