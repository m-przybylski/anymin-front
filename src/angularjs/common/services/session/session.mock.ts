// tslint:disable:readonly-array
// tslint:disable:no-empty
// tslint:disable:no-any
import * as angular from 'angular';
import { GetSession } from '@anymind-ng/api';
import { LoginCredentials } from 'profitelo-api-ng/model/models';

class UserSessionServiceMock {

  public static $inject = [];

  constructor() {
  }

  public logout = (): Promise<any> =>
    Promise.reject('mock')

  public login = (_loginDetails: LoginCredentials): Promise<GetSession> =>
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
