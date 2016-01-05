angular.module('profitelo.directive.registration', [

])

.directive('proRegistration', () =>{
  return {
    templateUrl:  'directives/registration/registration.tpl.html',
    restrict:     'A',
    controller:   'RegistrationDirectiveController',
    controllerAs: 'vm',
    scope:        {step1:'='},
    replace:      true
  }
})

.controller('RegistrationDirectiveController', RegistrationDirectiveController)

function RegistrationDirectiveController($scope, $state, $stateParams, AuthorizationService) {
  var vm = this

  vm.registrationMetaData = {
    emailSended:  false,
    step1:        $scope.step1
  }
  vm.userData = {
    email: '',
    password: ''
  }

  if (!vm.registrationMetaData.step1) {
    AuthorizationService.checkToken($stateParams).then((success)=>{
      console.log(success)
    }, (error) => {
    // redirecting to home, token is wrong!
      console.log(error)
      $state.go('app.home')
    })
  }

  vm.sendEmail= () =>{
    // TODO SEND EMAIL WITH LINK
    AuthorizationService.register({email:vm.userData.email, password:vm.userData.password}).then(()=>{
      vm.registrationMetaData.emailSended = true

    }, (error) =>{
      console.log('could not send email', error)
    })


  }


  return vm

}
