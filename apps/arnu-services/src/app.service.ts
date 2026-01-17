import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('PROFILE_SERVICE')
    private profileClient: ClientProxy,

    @Inject('COMIC_SERVICE')
    private comicClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello, from Gateway';
  }
}
