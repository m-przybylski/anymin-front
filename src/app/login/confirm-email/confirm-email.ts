(function() {

  function config($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.login.confirm-email', {
      url: '/confirm-email/token/:token',
      /* istanbul ignore next */
      resolve: {
        /* istanbul ignore next */
        account: (LoginConfirmEmailResolver, $stateParams) => {
          return LoginConfirmEmailResolver.resolve($stateParams)
        }
      },
      data : {
        access : UserRolesProvider.getAccessLevel('public'),
        pageTitle: 'PAGE_TITLE.LOGIN.CONFIRM_EMAIL'
      }
    })
  }

  angular.module('profitelo.controller.login.confirm-email', [
    'ui.router',
    'profitelo.resolvers.login-confirm-email'
  ])
  .config(config)

}())