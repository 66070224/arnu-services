import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  @MessagePattern({ cmd: 'auth.users.getHello' })
  getHello(): string {
    return 'hello from auth user';
  }
  @MessagePattern({ cmd: 'auth.users.create' })
  create(): string {
    return 'this is create user';
  }
}
