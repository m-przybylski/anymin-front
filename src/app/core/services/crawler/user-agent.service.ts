import { Injectable } from '@angular/core';

@Injectable()
export class UserAgentService {
  public get userAgent(): string {
    return window.navigator.userAgent;
  }
}
