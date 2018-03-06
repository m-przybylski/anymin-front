import * as angular from 'angular';
import { GetSession } from '@anymind-ng/api';
import { AccountLogin } from 'profitelo-api-ng/model/models';

class UserSessionServiceMock {

  public static $inject = [];

  constructor() {
  }

  public logout = (): Promise<any> =>
    Promise.reject('mock')

  public login = (_loginDetails: AccountLogin): Promise<GetSession> =>
    Promise.reject('mock')

  public isLoggedIn(): boolean {
    return true;
  }

  public getSession = (_force = false): Promise<GetSession> =>
    Promise.reject('mock')
}

const sessionMockModule = angular.module('profitelo.services.session', [
])
  .service('userSessionService', UserSessionServiceMock)
  .service('sessionServiceWrapper', UserSessionServiceMock)
  .name;

export default sessionMockModule;
