angular.module('profitelo.controller.registration', [
  'ui.router'
])
.config(($stateProvider) => {
  $stateProvider.state('app.registration', {
    url: '/registration',
    controllerAs: 'vm',
    controller: '',
    templateUrl: 'registration/registration.tpl.html'
  });
});
