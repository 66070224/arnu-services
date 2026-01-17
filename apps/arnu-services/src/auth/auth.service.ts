import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterDto } from 'apps/auth-service/src/users/users.dto';
import {
  PublicUser,
  RegisterData,
} from 'apps/auth-service/src/users/users.interface';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE')
    private authClient: ClientProxy,
  ) {}

  getAuth(): Observable<string> {
    return this.authClient.send({ cmd: 'auth.getHello' }, {});
  }

  getUsers(): Observable<string> {
    return this.authClient.send(
      { cmd: 'auth.users.getHello' },
      { data: 'hello' },
    );
  }

  createUser(data: RegisterDto): Observable<PublicUser> {
    return this.authClient.send({ cmd: 'auth.users.create' }, data);
  }
}
