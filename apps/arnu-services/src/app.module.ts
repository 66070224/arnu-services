import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';
import { AuthServiceController } from 'apps/auth-service/src/auth-service.controller';
import { AuthServiceService } from 'apps/auth-service/src/auth-service.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'AUTH_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: configService.get('AUTH_PORT') ?? 4001,
          },
        }),
        inject: [ConfigService],
      },
      {
        imports: [ConfigModule],
        name: 'PROFILE_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: configService.get('PROFILE_PORT') ?? 4002,
          },
        }),
        inject: [ConfigService],
      },
      {
        imports: [ConfigModule],
        name: 'COMIC_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: configService.get('COMIC_PORT') ?? 4003,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController, AuthServiceController],
  providers: [AppService, AuthServiceService],
})
export class AppModule {}
