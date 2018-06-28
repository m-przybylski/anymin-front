// tslint:disable:readonly-array
// tslint:disable:no-empty
import * as angular from 'angular';
import { GetSession } from '@anymind-ng/api';
import { AccountDetails, LoginCredentials } from 'profitelo-api-ng/model/models';

class UserServiceMock {

  public static $inject = [];

  constructor() {
  }

  public getUser = (_purgeCache = false): Promise<AccountDetails> => Promise.reject('mock');

  public logout = (): Promise<void> => Promise.reject('mock');

  public login = (_loginDetails: LoginCredentials): Promise<GetSession> => Promise.reject('mock');
}

const userMockModule = angular.module('profitelo.services.user', [])
  .service('userService', UserServiceMock)
  .name;

export default userMockModule;
