angular.module('profitelo.directive.registration', [

])

.directive('proRegistration', () =>{
  return {
    templateUrl:    'directives/registration/registration.tpl.html',
    restrict: 'A',
    controller: 'RegistrationDirectiveController',
    replace: true
  }
})

.controller('RegistrationDirectiveController', RegistrationDirectiveController);

function RegistrationDirectiveController() {
  console.log("here i am directive");

}
