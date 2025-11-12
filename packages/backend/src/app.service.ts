import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): { status: string; timestamp: string; uptime: number } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  getInfo(): {
    name: string;
    version: string;
    description: string;
    environment: string;
  } {
    return {
      name: 'Agrodiario API',
      version: '1.0.0',
      description: 'Agricultural management system API',
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
