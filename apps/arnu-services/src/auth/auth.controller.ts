import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { PublicUser } from 'apps/auth-service/src/users/users.interface';
import { RegisterDto } from 'apps/auth-service/src/users/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('get-hello')
  getAuthHello(): Observable<string> {
    return this.authService.getAuth();
  }

  @Get('users/get-hello')
  getUsersHello(): Observable<string> {
    return this.authService.getUsers();
  }

  @Post('users/create')
  postUsersCreate(
    @Body()
    body: RegisterDto,
  ): Observable<PublicUser> {
    return this.authService.createUser({
      email: body.email,
      username: body.username,
      password: body.password,
      confirm_password: body.confirm_password,
    });
  }
}
