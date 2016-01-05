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

function RegistrationDirectiveController($stateParams) {
  var vm = this
  if ($stateParams.token==="") {
    console.log('jestem undefined')
  }
  vm.registrationMetaData = {
    emailSended:  false,
    step1:        true
  }
  vm.userData = {
    email: '',
    password: ''
  }



  vm.sendEmail= () =>{
    // TODO SEND EMAIL WITH LINK
    vm.registrationMetaData.emailSended = true

    // vm.registrationMetaData.step1 = false
    // AuthorizationService.register({email:vm.userData.email, password:vm.userData.password})

  }


  return vm

}
