import * as angular from 'angular';
import apiModule from 'profitelo-api-ng/api.module';
import { AccountApi } from 'profitelo-api-ng/api/api';
import { TopAlertService } from '../../services/top-alert/top-alert.service';
import { SessionServiceWrapper } from '../../services/session/session.service';
import topAlertModule from '../../services/top-alert/top-alert';
import sessionModule from '../../services/session/session';
import { TranslatorService } from '../../services/translator/translator.service';
import translatorModule from '../../services/translator/translator';
import { Config } from '../../../../config';
import { IRootScopeService } from '../../services/root-scope/root-scope.service';
import { StateService } from '@uirouter/angularjs';

export class LoginConfirmEmailResolver {

  static $inject = ['$q', '$rootScope', '$timeout', 'translatorService', '$state', 'topAlertService',
    'sessionServiceWrapper', 'AccountApi'];

  constructor(private $q: ng.IQService, private $rootScope: IRootScopeService, private $timeout: ng.ITimeoutService,
              private translatorService: TranslatorService, private $state: StateService,
              private topAlertService: TopAlertService, private sessionServiceWrapper: SessionServiceWrapper,
              private AccountApi: AccountApi) {

  }

  public resolve = (token: string | null): ng.IPromise<undefined> => {
    const _deferred = this.$q.defer<undefined>();

    const handleBadToken = (): void => {
      _deferred.reject();
      this.topAlertService.error({
        message: this.translatorService.translate('LOGIN.EMAIL_CONFIRMATION_FAIL'),
        timeout: 4
      });
      this.$timeout(() => {
        this.$state.go('app.login.account');
      });
    };

    const handleGoodToken = (): void => {

      this.sessionServiceWrapper.getSession(true).then((_response) => {

        _deferred.resolve();

        this.topAlertService.success({
          message: this.translatorService.translate('LOGIN.EMAIL_CONFIRMATION_SUCCESS'),
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
