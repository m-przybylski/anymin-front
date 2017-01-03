(function() {

  function controller() {

    return this
  }

  function config($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.post-register', {
      url: '/post-register',
      controllerAs: 'vm',
      controller: 'PostRegisterController',
      templateUrl: 'post-register/post-register.tpl.html',
      abstract: true,
      data: {
        access: UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.LOGIN.REGISTER'
      }
    })
  }

  angular.module('profitelo.controller.post-register', [
    'ui.router',
    'c7s.ng.userAuth'
  ])
    .config(config)
    .controller('PostRegisterController', controller)
}())