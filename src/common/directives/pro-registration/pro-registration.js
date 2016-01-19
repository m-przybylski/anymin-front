function proRegistration($scope, $state, $stateParams, $filter, UserService, AuthorizationService, ProfilesApi, toastr) {
  var vm = this

  // step 1

  vm.registrationMetaData = {
    emailSended:  false,
    step1:        $scope.step1
  }
  vm.userData = {
    email:    '',
    password: '',
    pin:      ''
  }

  vm.sendEmail = () =>{
    AuthorizationService.register({email:vm.userData.email, password:vm.userData.password}).then(()=>{
      vm.registrationMetaData.emailSended = true
    }, (error) =>{
      console.log('could not send email', error)
    })
  }

  vm.sendAndGoNext = () => {
    vm.submitted = true
    var msg = $filter('translate')('EXPERT_PROFILE.MESSAGES.DATA_SAVED_SUCCESSFULLY')
    var title = $filter('translate')('EXPERT_PROFILE.EXPERT_PROFILE')
    if ($scope.registration.$valid) {
      vm.sendEmail()
    } else {
      toastr.error('Wrong credentials', 'Registration error')
    }
  }

  // step 2

  if (!vm.registrationMetaData.step1) {
    AuthorizationService.checkToken($stateParams).then((response)=>{
      UserService.setData(response)
      AuthorizationService.setApiKeyHeader(response.apiKey)
    }, (error) => {
      console.log(error)
      $state.go('app.home')
    })
  }

  vm.verifyPinAndGo = () => {
    vm.submitted = true
    UserService.setData(vm.userData.pin)
    if ($scope.registration.$valid) {
      ProfilesApi.update(UserService.getAllData)
      // save data, redirect to expert-progress?
    } else {
      toastr.error('Wrong pin', 'Should be number!')
    }

  }

  return vm

}

angular.module('profitelo.directives.pro-registration', [
  'ui.router',
  'authorization',
  'ngCookies',
  'toastr',
  'user',
  'profitelo.api.profiles',
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



