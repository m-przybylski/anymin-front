function proRegistration($scope, $state, $stateParams, AuthorizationService, HellojsService) {
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
    AuthorizationService.checkToken($stateParams).then(()=>{
    }, (error) => {
      console.log(error)
      $state.go('app.home')
    })
  }

  vm.sendEmail = () =>{
    AuthorizationService.register({email:vm.userData.email, password:vm.userData.password}).then(()=>{
      vm.registrationMetaData.emailSended = true
    }, (error) =>{
      console.log('could not send email', error)
    })
  }

  vm.registerSocial = () => {
    HellojsService.getMe('facebook')
  }


  return vm

}

angular.module('profitelo.directives.pro-registration', [
  'ui.router',
  'authorization',
  'ngCookies',
  'profitelo.services.commonSettings',
  'profitelo.api.sessions',
  'profitelo.api.registration'
])

.directive('proRegistration', () =>{
  return {
    templateUrl:  'directives/pro-registration/pro-registration.tpl.html',
    restrict:     'A',
    controller:   proRegistration,
    controllerAs: 'vm',
    scope:        {step1:'='},
    replace:      true
  }
})



