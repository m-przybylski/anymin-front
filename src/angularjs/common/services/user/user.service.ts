// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
import * as angular from 'angular';
import { SessionServiceWrapper } from '../session/session.service';
import { EventsService } from '../events/events.service';
import { Account, LoginCredentials } from '@anymind-ng/api';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';

export interface IExtendedAccount extends Account {
  isExpert: boolean;
  isCompany: boolean;
}

export class UserService {
  public static $inject = ['sessionServiceWrapper', 'eventsService'];

  constructor(private sessionServiceWrapper: SessionServiceWrapper, private eventsService: EventsService) {}

  public getUser = (purgeCache = false): ng.IPromise<IExtendedAccount> =>
    this.sessionServiceWrapper.getSession(purgeCache).then(session => {
      const accountStatusObject = {
        isExpert: session.isExpert,
        isCompany: session.isCompany,
      };
      if (session.account) {
        return Object.assign(angular.copy(session.account), accountStatusObject);
      } else {
        throw new Error('AccountDetails in session was not defined');
      }
    });

  public logout = (): ng.IPromise<void> =>
    this.sessionServiceWrapper.logout().then(() => this.eventsService.emit('logout'));

  public login = (loginDetails: LoginCredentials): ng.IPromise<GetSessionWithAccount> =>
    this.sessionServiceWrapper.login(loginDetails).then(session => {
      this.eventsService.emit('login');

      return session;
    });
}
