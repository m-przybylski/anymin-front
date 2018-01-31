import * as angular from 'angular';
import { GetSession, AccountLogin } from '@anymind-ng/api';

class UserSessionServiceMock {

  static $inject = [];

  constructor() {
  }

  public logout = (): Promise<any> =>
    Promise.reject('mock')

  public login = (_loginDetails: AccountLogin): Promise<GetSession> =>
    Promise.reject('mock')

  public isLoggedIn(): boolean {
    return true;
  }

  public getSession = (_force: boolean = false): Promise<GetSession> =>
    Promise.reject('mock')
}

const sessionMockModule = angular.module('profitelo.services.session', [
])
  .service('userSessionService', UserSessionServiceMock)
  .service('sessionServiceWrapper', UserSessionServiceMock)
  .name;

export default sessionMockModule;
