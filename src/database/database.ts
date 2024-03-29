import { Connection, Mongoose } from 'mongoose';

export class DataBases extends Mongoose {
  private clientOption = {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  private databases: { [key: string]: Connection } = {};

  private getConnectionUri = (companyName = '') =>
    `mongodb+srv://batu:YQsoxSONGkbEN4MU@cluster0.0okex.mongodb.net/${companyName}?retryWrites=true&w=majority&appName=Cluster0`;

  public async getConnection(companyName = ''): Promise<Connection> {
    const connection = this.databases[companyName];
    return connection ? connection : await this.createDataBase(companyName);
  }

  private async createDataBase(comapnyName = ''): Promise<Connection> {
    //  create new connection and if the database not exists just create new one
    const newConnection = await this.createConnection(
      this.getConnectionUri(comapnyName),
      this.clientOption
    );
    this.databases[comapnyName] = newConnection;
    return newConnection;
  }
}
