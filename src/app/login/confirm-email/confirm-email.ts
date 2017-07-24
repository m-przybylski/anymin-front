import * as angular from 'angular'
import {ILoginConfirmEmailService} from '../../../common/resolvers/login-confirm-email/login-confirm-email.service'
import 'common/resolvers/login-confirm-email/login-confirm-email.service'
import {IPromise} from 'angular'

export interface IConfirmEmailStateParams extends ng.ui.IStateParamsService {
  token: string
}

function config($stateProvider: ng.ui.IStateProvider): void {
  $stateProvider.state('app.login.confirm-email', {
    url: '/confirm-email/token/:token',
    /* istanbul ignore next */
    resolve: {
      /* istanbul ignore next */
      account: (LoginConfirmEmailResolver: ILoginConfirmEmailService, $stateParams: IConfirmEmailStateParams): IPromise<undefined> => {
        return LoginConfirmEmailResolver.resolve($stateParams)
      }
    },
    data: {
      pageTitle: 'PAGE_TITLE.LOGIN.CONFIRM_EMAIL'
    }
  })
}

angular.module('profitelo.controller.login.confirm-email', [
  'ui.router',
  'profitelo.resolvers.login-confirm-email'
])
  .config(config)
