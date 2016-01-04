angular.module('profitelo.directive.registration', [

])

.directive('proRegistration', () =>{
  return {
    templateUrl:  'directives/registration/registration.tpl.html',
    restrict:     'A',
    controller:   'RegistrationDirectiveController',
    controllerAs: 'vm',
    replace:      true
  }
})

.controller('RegistrationDirectiveController', RegistrationDirectiveController)

function RegistrationDirectiveController() {
  var vm = this
  console.log('here i am directive')


  return vm

}
