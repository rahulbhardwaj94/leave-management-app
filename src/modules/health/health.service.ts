import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  async getHealth(): Promise<string> {
    return 'Service is Healthy and Running!!';
  }
}
