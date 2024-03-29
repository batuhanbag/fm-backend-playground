import { Injectable } from '@nestjs/common';
@Injectable()
export class AuthService {
  // KEYS DUMMY FOR NOW
  private apiKeys: string[] = ['pregnancy', 'test'];
  validateApiKey(apiKey: string) {
    return this.apiKeys.find(apiK => apiKey === apiK);
  }
}
