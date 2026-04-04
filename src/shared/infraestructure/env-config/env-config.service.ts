import { Injectable } from '@nestjs/common';
import { EnvConfig } from './env-config.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private configService: ConfigService) {}

  getAppPort(): number {
    const rawPort = this.configService.get<string | number>('PORT');
    const port = Number(rawPort);
    return Number.isNaN(port) ? 3000 : port;
  }
  getNodeEnv(): string {
    return (
      (this.configService.get<string>('NODE_ENV') as string) || 'development'
    );
  }
}
