import { Controller, Get } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @MessagePattern({ cmd: 'auth.getHello' })
  getHello(): string {
    return this.authServiceService.getHello();
  }
  @MessagePattern({ cmd: 'auth.getHello2' })
  getHellotwo(): string {
    return this.authServiceService.getHello();
  }
}
