import * as angular from 'angular'
import {AccountDetails, AccountLogin, GetSession} from '@anymind-ng/api'

class UserServiceMock {

  static $inject = [];

  constructor() {
  }

  public getUser = (_purgeCache = false): Promise<AccountDetails> => Promise.reject('mock')

  public logout = (): Promise<void> => Promise.reject('mock')

  public login = (_loginDetails: AccountLogin): Promise<GetSession> => Promise.reject('mock')
}

const userMockModule = angular.module('profitelo.services.user', [])
  .service('userService', UserServiceMock)
  .name

export default userMockModule;
