import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

interface PublicUser {
  email: string;
  username: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  async create(
    email: string,
    username: string,
    password: string,
  ): Promise<PublicUser> {
    const existUser = await this.userRepository.findOneBy({ email });
    if (existUser) {
      if (existUser.email === email) {
        throw new ConflictException('This email already exists');
      }
      if (existUser.username === username) {
        throw new ConflictException('This username already exists');
      }
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = this.userRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);

    return {
      email: savedUser.email,
      username: savedUser.username,
    };
  }
}
