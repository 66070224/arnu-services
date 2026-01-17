import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import type { PublicUser } from './users.interface';
import { UsersService } from './users.service';
import { log } from 'console';
import { RegisterDto } from './users.dto';
import { UserId } from './users.type';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @MessagePattern({ cmd: 'auth.users.getHello' })
  getHello({ data }): string {
    return data;
  }
  @MessagePattern({ cmd: 'auth.users.create' })
  create(data: RegisterDto): Promise<UserId> {
    log(data);
    if (data.password !== data.confirm_password)
      throw new BadRequestException('Both password are not match');
    return this.usersService.create(data.email, data.username, data.password);
  }
}
