import * as angular from 'angular';
import apiModule from 'profitelo-api-ng/api.module';
import { AccountApi } from 'profitelo-api-ng/api/api';
import { TopAlertService } from '../../services/top-alert/top-alert.service';
import { SessionServiceWrapper } from '../../services/session/session.service';
import topAlertModule from '../../services/top-alert/top-alert';
import sessionModule from '../../services/session/session';
import translatorModule from '../../services/translator/translator';
import { Config } from '../../../../config';
import { IRootScopeService } from '../../services/root-scope/root-scope.service';
import { StateService } from '@uirouter/angularjs';

// tslint:disable:member-ordering
export class LoginConfirmEmailResolver {

  public static $inject = ['$q', '$rootScope', '$timeout', '$state', 'topAlertService',
    'sessionServiceWrapper', 'AccountApi', '$location'];

  constructor(private $q: ng.IQService, private $rootScope: IRootScopeService, private $timeout: ng.ITimeoutService,
              private $state: StateService,
              private topAlertService: TopAlertService, private sessionServiceWrapper: SessionServiceWrapper,
              private AccountApi: AccountApi,
              private $location: ng.ILocationService) {

  }

  public resolve = (token: string | null): ng.IPromise<undefined> => {
    const _deferred = this.$q.defer<undefined>();

    const handleBadToken = (): void => {
      _deferred.reject();
      this.topAlertService.error({
        message: 'Nie udało się potwierdzić adresu email.',
        timeout: 4
      });
      this.$timeout(() => {
        this.$location.path('/login');
      });
    };

    const handleGoodToken = (): void => {

      this.sessionServiceWrapper.getSession(true).then((_response) => {

        _deferred.resolve();

        this.topAlertService.success({
          message: 'Adres email został potwierdzony!',
          timeout: 4
        });

        this.$timeout(() => {
          this.$rootScope.loggedIn = true;
          Config.isPlatformForExpert ?
            this.$state.go('app.dashboard.expert.activities') : this.$state.go('app.dashboard.client.favourites');
        });

      }, handleBadToken);

    };

    const verifyEmailToken = (token: string): void => {

      this.AccountApi.postAccountVerifyEmailRoute(token).then(_response => {
        handleGoodToken();
      }, handleBadToken);

    };

    if (token && token !== '') {
      verifyEmailToken(token);
    } else {
      handleBadToken();
    }

    return _deferred.promise;
  }

}

const loginConfirmEmailModule = angular.module('profitelo.resolvers.login-confirm-email', [
  apiModule,
  topAlertModule,
  sessionModule,
  translatorModule,
  'profitelo.directives.interface.pro-alert'
])
  .service('LoginConfirmEmailResolver', LoginConfirmEmailResolver)
  .name;

export default loginConfirmEmailModule;
