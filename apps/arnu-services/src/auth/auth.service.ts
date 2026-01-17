import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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

  getAuth2(): Observable<string> {
    return this.authClient.send({ cmd: 'auth.getHello2' }, {});
  }

  getUsers(): Observable<string> {
    return this.authClient.send({ cmd: 'auth.users.getHello' }, {});
  }
}
