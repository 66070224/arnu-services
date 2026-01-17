import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserId } from '../users/users.type';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserId> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) throw new BadRequestException('No user in database');

    if (await bcrypt.compare(password, user.password)) {
      return user.id;
    }
    throw new BadRequestException('Wrong password');
  }

  async login(userId: UserId): Promise<String> {
    const payload: AuthPayload = { userId };
    return this.jwtService.signAsync(payload);
  }
}
