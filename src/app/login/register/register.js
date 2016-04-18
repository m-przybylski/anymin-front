(function() {

  function RegisterController($filter, $timeout, $state, proTopWaitingLoaderService, passwordStrengthService, User, proTopAlertService, UserRoles, smsSessionId, RegistrationApi, AccountApi) {
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
      if (!vm.isPending) {
        vm.isPending = true
        proTopWaitingLoaderService.immediate()

        RegistrationApi.confirmVerification({
          sessionId: vm.registrationSteps.sessionId,
          code: vm.registrationSteps.smsCode
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
          proTopAlertService.error({
            message: $filter('translate')('INTERFACE.API_ERROR'),
            timeout: 4
          })
          proTopWaitingLoaderService.stopLoader()
        })

      }
    }

    let _updateNewUserObject = (patchObject, successCallback) => {
      if (!vm.isPending) {
        vm.isPending = true
        proTopWaitingLoaderService.immediate()

        patchObject.accountId = User.getData('id')

        AccountApi.partialUpdateAccount(patchObject).$promise.then(successCallback, (error) => {
          vm.isPending = false
          proTopWaitingLoaderService.stopLoader()
          console.log(error)
        })

      }
    }

    vm.setNewEmail = () => {
      _updateNewUserObject({
        email: vm.registrationSteps.email
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
        smsSessionId: (loginStateService, $state, $filter, $q, $timeout, proTopAlertService, RegistrationApi) => {

          let _deferred = $q.defer()

          let _handleError = () => {
            _deferred.reject()
            $timeout(()=>{
              $state.go('app.login.account')
            })
          }

          let _account = loginStateService.getAccountObject()

          if (_account.phoneNumber.number === null) {
            proTopAlertService.warning({
              message: $filter('translate')('REGISTER.ENTER_PHONE_NUMBER_FIRST'),
              timeout: 3
            })
            _handleError()
          } else {
            RegistrationApi.requestVerification({
              msisdn: _account.phoneNumber.prefix + _account.phoneNumber.number
            }).$promise.then((response) => {
              _deferred.resolve({
                sessionId: response.sessionId,
                accountObject: _account
              })
            }, (error) => {
              proTopAlertService.warning({
                message: $filter('translate')('INTERFACE.API_ERROR'),
                timeout: 3
              })
              _handleError()
            })
          }

          return _deferred.promise
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
    'profitelo.swaggerResources'
  ])
  .config(config)
  .controller('RegisterController', RegisterController)

}())