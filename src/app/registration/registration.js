angular.module('profitelo.controller.registration', [
  'ui.router'
])
.config(($stateProvider) => {
  $stateProvider.state('app.registration', {
    url: '/registration',
    controllerAs: 'vm',
    controller: 'RegistrationController',
    templateUrl: 'registration/registration.tpl.html'
  });
})
.controller('RegistrationController', RegistrationController);

function RegistrationController() {
  var vm = this;
  console.log('here I am controller');

  return vm;

}
