function proRegistration($scope, $state, $stateParams, $filter, AuthorizationService, toastr, HellojsService) {

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

  vm.sendAndGoNext = function() {
    vm.submitted = true
    var msg = $filter('translate')('EXPERT_PROFILE.MESSAGES.DATA_SAVED_SUCCESSFULLY')
    var title = $filter('translate')('EXPERT_PROFILE.EXPERT_PROFILE')
    if ($scope.registration.$valid) {
      vm.sendEmail()
    } else {
      toastr.error('Wrong credentials', 'Registration error')
    }
  }

  return vm

}

angular.module('profitelo.directives.pro-registration', [
  'ui.router',
  'authorization',
  'ngCookies',
  'toastr',
  'hellojs',
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

