namespace profitelo.login.confirmEmail {

  import ILoginConfirmEmailService = profitelo.resolvers.loginConfirmEmail.ILoginConfirmEmailService

  export interface IConfirmEmailStateParams extends ng.ui.IStateParamsService {
    token: string
  }

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.login.confirm-email', {
      url: '/confirm-email/token/:token',
      /* istanbul ignore next */
      resolve: {
        /* istanbul ignore next */
        account: (LoginConfirmEmailResolver: ILoginConfirmEmailService, $stateParams: IConfirmEmailStateParams) => {
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

}
