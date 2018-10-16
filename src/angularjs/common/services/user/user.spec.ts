import * as angular from 'angular';
import { IExtendedAccount, UserService } from './user.service';
import userModule from './user';
import { LoginCredentials } from 'profitelo-api-ng/model/models';
import sessionMockModule from '../session/session.mock';
import { Account } from '@anymind-ng/api';

describe('Unit testing: profitelo.services.userService >', () => {
  describe('for profitelo.services.userService >', () => {
    let userServiceT: UserService;
    let rootScope: ng.IRootScopeService;
    let q: ng.IQService;
    let resolverParam: ng.IPromise<{ account: IExtendedAccount }>;

    const accountDetails: IExtendedAccount = {
      isExpert: undefined,
      isCompany: undefined,
    } as any;

    const eventsService = {
      emit: (param: string): string => param,
    };

    const sessionServiceWrapper = {
      getSession: (): ng.IPromise<{ account: Account }> => resolverParam,
      logout: (): ng.IPromise<void> => q.resolve(),
      login: (_loginDetails: LoginCredentials): ng.IPromise<void> => q.resolve(),
    };

    beforeEach(() => {
      angular.mock.module(sessionMockModule);
    });

    beforeEach(() => {
      angular.mock.module(userModule);
    });

    beforeEach(
      angular.mock.module(function($provide: ng.auto.IProvideService): void {
        $provide.value('apiUrl', 'awesome');
      }),
    );

    beforeEach(
      angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('eventsService', eventsService);
        $provide.value('sessionServiceWrapper', sessionServiceWrapper);
      }),
    );

    beforeEach(inject((
      $injector: ng.auto.IInjectorService,
      $rootScope: angular.IRootScopeService,
      $q: ng.IQService,
    ) => {
      userServiceT = $injector.get<UserService>('userService');
      /*angular.mock.inject((_userService_: UserService) => {
        userServiceT = _userService_
      })*/
      rootScope = $rootScope;
      q = $q;

      resolverParam = q.resolve({ account: accountDetails });
    }));

    it('should have a dummy test', () => {
      expect(true).toBeTruthy();
    });

    it('should get user data', () => {
      userServiceT.getUser().then(res => {
        expect(res).toEqual(accountDetails);
      });
      rootScope.$digest();
    });

    it('should logout user', () => {
      spyOn(eventsService, 'emit');
      userServiceT.logout().then(() => {
        expect(eventsService.emit).toHaveBeenCalledWith('logout');
      });
      rootScope.$digest();
    });

    it('should login user', () => {
      spyOn(eventsService, 'emit');
      userServiceT.login({ msisdn: '+48123456789', password: 'ToJestProfitelo' }).then(() => {
        expect(eventsService.emit).toHaveBeenCalledWith('login');
      });
      rootScope.$digest();
    });
  });
});
