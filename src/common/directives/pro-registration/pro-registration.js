function proRegistration($scope, $rootScope, $state, $stateParams, $filter, UserService, AuthorizationService, HellojsService, AccountsApi, RegistrationCheckApi, CommonSettingsService, toastr) {
  var vm = this,
      msg,
      title

  // step 1
  vm.settings = CommonSettingsService.localSettings
  vm.registrationMetaData = {
    emailSended:  false,
    step1:        $scope.step1
  }
  vm.userData = {
    email: '',
    password: '',
    pin:      ''
  }

  vm.onBlurFunction = ()=>{
    if (typeof(vm.userData.email)!=='undefined') {
      RegistrationCheckApi.checkEmail({email:vm.userData.email})
    }
  }

  vm.sendEmail = () =>{
    AuthorizationService.register({email:vm.userData.email, password:vm.userData.password}).then(()=>{
      vm.registrationMetaData.emailSended = true
    }, (error) =>{
      toastr.error('Email already in use', 'Registration error')
    })
  }

  vm.registerSocial = () => {
    HellojsService.getMe('facebook')
  }

  vm.sendAndGoNext = () => {
    vm.submitted = true
    msg = $filter('translate')('EXPERT_PROFILE.MESSAGES.DATA_SAVED_SUCCESSFULLY')
    title = $filter('translate')('EXPERT_PROFILE.EXPERT_PROFILE')
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
  } else {
    $rootScope.registrationFooterData.step1 = true
  }

  vm.verifyPinAndGo = () => {
    vm.submitted = true
    UserService.setData({telcoPin: vm.userData.pin})
    if ($scope.pinForm.$valid) {
      let _data = UserService.getAllData()
      AccountsApi.update({id: _data.id }, {telcoPin: vm.userData.pin}).$promise.then(()=>{
        $state.go('app.home')
      })
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
  'hellojs',
  'profitelo.services.user',
  'profitelo.services.customTranslationHandler',
  'profitelo.api.accounts',
  'profitelo.api.profiles',
  'profitelo.api.session',
  'profitelo.api.registration',
  'profitelo.services.commonSettings'
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

