import * as angular from 'angular';
import { IForgotPasswordStateParams } from '../../../app/login/forgot-password/forgot-password';
import { LoginStateService } from '../../services/login-state/login-state.service';
import { TopAlertService } from '../../services/top-alert/top-alert.service';
import apiModule from 'profitelo-api-ng/api.module';
import { RecoverPasswordApi } from 'profitelo-api-ng/api/api';
import loginStateModule from '../../services/login-state/login-state';
import topAlertModule from '../../services/top-alert/top-alert';
import { TranslatorService } from '../../services/translator/translator.service';
import translatorModule from '../../services/translator/translator';
import { StateService } from '@uirouter/angularjs';
import { httpCodes } from '../../classes/http-codes';

export interface ILoginForgotPassword {
  recoveryMethod: string;
  accountObject: any;
}

export interface ILoginForgotPasswordService {
  resolve(stateParams: IForgotPasswordStateParams): ng.IPromise<ILoginForgotPassword>;
}

// tslint:disable:strict-type-predicates
class LoginForgotPasswordResolver implements ILoginForgotPasswordService {

  public static $inject = ['$q', '$timeout', 'translatorService', '$state', 'topAlertService', 'loginStateService',
    'RecoverPasswordApi'];

  private cacheResolvedObject: ILoginForgotPassword;

  constructor(private $q: ng.IQService,
              private $timeout: ng.ITimeoutService,
              private translatorService: TranslatorService,
              private $state: StateService,
              private topAlertService: TopAlertService,
              private loginStateService: LoginStateService,
              private RecoverPasswordApi: RecoverPasswordApi) {

  }

  public resolve = (stateParams: IForgotPasswordStateParams): ng.IPromise<ILoginForgotPassword> => {
    const _deferred = this.$q.defer<ILoginForgotPassword>();

    const account = this.loginStateService.getAccountObject();

    const handleError = (error?: any): void => {
      if (error && error.status === httpCodes.badRequest) {
        _deferred.resolve(this.cacheResolvedObject);
      } else {
        _deferred.reject();
        this.topAlertService.error({
          message: this.translatorService.translate('LOGIN.PASSWORD_RECOVERY.ERROR')
        });
        this.$timeout(() => {
          this.$state.go('app.login.account');
        });
      }
    };

    const requestPasswordRecovery = (method: any): ng.IPromise<{}> =>
      this.RecoverPasswordApi.postRecoverPasswordRoute({
        method,
        msisdn: account.phoneNumber.prefix + '' + account.phoneNumber.number
      });

    const noEmailRecoveryPath = (): void => {
      requestPasswordRecovery('SMS').then(() => {
        const resolvedObject = {
          accountObject: account,
          recoveryMethod: 'SMS'
        };
        this.setCacheAccountObject(resolvedObject);
        _deferred.resolve(resolvedObject);
      }, handleError);
    };

    if (account.phoneNumber.number === null) {
      handleError();
    } else {
      if (stateParams.method === 'sms') {
        noEmailRecoveryPath();
      } else {
        requestPasswordRecovery('EMAIL').then(() => {
          const resolvedObject = {
            accountObject: account,
            recoveryMethod: 'EMAIL'
          };
          this.setCacheAccountObject(resolvedObject);
          _deferred.resolve(resolvedObject);
        }, noEmailRecoveryPath);
      }
    }

    return _deferred.promise;
  }

  private setCacheAccountObject = (resolvedObject: ILoginForgotPassword): void => {
    this.cacheResolvedObject = resolvedObject;
  }
}

angular.module('profitelo.resolvers.login-forgot-password', [
  apiModule,
  loginStateModule,
  translatorModule,
  topAlertModule
])
  .service('LoginForgotPasswordResolver', LoginForgotPasswordResolver);
