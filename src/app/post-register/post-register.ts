(function() {

  function controller() {

    return this
  }

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.post-register', {
      url: '/post-register',
      controllerAs: 'vm',
      controller: 'PostRegisterController',
      templateUrl: 'post-register/post-register.tpl.html',
      abstract: true,
      data: {
        permissions: {
          except: ['anon'],
          redirectTo: 'app.login'
        },
        pageTitle: 'PAGE_TITLE.LOGIN.REGISTER'
      }
    })
  }

  angular.module('profitelo.controller.post-register', [
    'ui.router',
    'permission',
    'permission.ui',
    'profitelo.services.session'
  ])
    .config(config)
    .controller('PostRegisterController', controller)
}())
