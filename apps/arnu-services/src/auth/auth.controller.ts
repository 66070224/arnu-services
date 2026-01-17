import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  getAuth(): Observable<string> {
    return this.authService.getAuth();
  }

  @Get('users')
  getUsersCreate(): Observable<string> {
    return this.authService.getUsers();
  }
}
