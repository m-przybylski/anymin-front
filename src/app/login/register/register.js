(function() {

  function RegisterController($filter, $state, proTopWaitingLoaderService, passwordStrengthService, User, proTopAlertService, UserRoles, smsSessionId, RegistrationApi, AccountApi, loginStateService) {
    var vm = this
    vm.passwordStrength = 0
    vm.current = 1
    vm.isPending = false
    vm.rulesAccepted = false

    vm.registrationSteps = {
      account: smsSessionId.accountObject,
      smsCode: null,
      sessionId: smsSessionId.sessionId,
      email: null,
      password: null
    }

    vm.onPasswordChange = (password) => {
      vm.passwordStrength = passwordStrengthService(password)
    }

    vm.getSmsCodeStatus = () => {
      /* istanbul ignore next if */
      if (!vm.isPending) {
        vm.isPending = true
        proTopWaitingLoaderService.immediate()
        RegistrationApi.confirmVerification({
          sessionId: vm.registrationSteps.sessionId,
          token: vm.registrationSteps.smsCode
        }).$promise.then((response) => {
          vm.isPending = false
          vm.current = 2
          proTopWaitingLoaderService.stopLoader()

          delete response.$promise
          delete response.$resolved
          User.setData(response)
          User.setApiKeyHeader(response.apiKey)
          User.setData({role: UserRoles.getRole('user')})

        }, (error) => {
          vm.isPending = false
          proTopAlertService.warning({
            message: $filter('translate')('LOGIN.FORGOT_PASSWORD.BAD_SMS_CODE'),
            timeout: 4
          })
          proTopWaitingLoaderService.stopLoader()
        })

      }
    }

    let _updateNewUserObject = (patchObject, successCallback) => {
      /* istanbul ignore next if */
      if (!vm.isPending) {
        vm.isPending = true
        proTopWaitingLoaderService.immediate()

        patchObject.accountId = User.getData('id')

        AccountApi.partialUpdateAccount(patchObject).$promise.then(successCallback, (error) => {
          vm.isPending = false
          proTopWaitingLoaderService.stopLoader()
          proTopAlertService.error({
            message: $filter('translate')('INTERFACE.API_ERROR'),
            timeout: 4
          })
        })

      }
    }

    vm.setNewEmail = () => {
      _updateNewUserObject({
        unverifiedEmail: vm.registrationSteps.email
      }, () => {
        vm.isPending = false
        vm.current = 3
        proTopWaitingLoaderService.stopLoader()
      })
    }

    vm.completeRegistration = () => {
      _updateNewUserObject({
        password: vm.registrationSteps.password
      }, () => {
        vm.isPending = false
        proTopAlertService.success({
          message: $filter('translate')('REGISTER.REGISTRATION_SUCCESS')
        })
        loginStateService.clearServiceObject()
        $state.go('app.dashboard.start')
      })

    }

    return vm
  }

  function config($stateProvider) {
    $stateProvider.state('app.login.register', {
      url: '/register',
      controllerAs: 'vm',
      controller: 'RegisterController',
      templateUrl: 'login/register/register.tpl.html',
      resolve: {
        /* istanbul ignore next */
        smsSessionId: (AppLoginRegisterResolver) => {
          /* istanbul ignore next */
          return AppLoginRegisterResolver.resolve()
        }
      }
    })
  }


  

  angular.module('profitelo.controller.login.register', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.directives.password-strength-service',
    'profitelo.services.login-state',
    'profitelo.directives.pro-top-alert-service',
    'profitelo.directives.pro-top-waiting-loader-service',
    'profitelo.services.resolvers.app.login.register',
    'profitelo.swaggerResources'
  ])
  .config(config)
  .controller('RegisterController', RegisterController)

}())