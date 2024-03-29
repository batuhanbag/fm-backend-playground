export interface APIKey {
  _id: string;
  key: string;
  createdAt: Date;
  updatedAt: Date;
}

export type APIKeyDTO = Omit<APIKey, '_id'>;
