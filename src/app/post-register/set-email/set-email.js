(function() {

  function _controller($filter, $state, proTopWaitingLoaderService, User, proTopAlertService, AccountApi) {

    this.isPending = false
    this.rulesAccepted = false
    this.serverError = false
    this.alreadyCheck = false
    this.correctCode = false
    this.email = ''
    this.emailExist = false

    let _updateNewUserObject = (patchObject, successCallback) => {
      /* istanbul ignore next if */
      if (!this.isPending) {
        this.isPending = true
        proTopWaitingLoaderService.immediate()

        patchObject.accountId = User.getData('id')

        AccountApi.partialUpdateAccount(patchObject).$promise.then(successCallback, (error) => {
          this.isPending = false
          proTopWaitingLoaderService.stopLoader()
          proTopAlertService.error({
            message: $filter('translate')('INTERFACE.API_ERROR'),
            timeout: 4
          })
        })

      }
    }

    let _isEmailExists = (email) => {
      return AccountApi.getAccountEmailExists({
        email: email
      }).$promise
    }

    this.setNewEmail = () => {
      _isEmailExists(this.email).then(response => {
        this.emailExist = true
      }, ()=> {
        _updateNewUserObject({
          unverifiedEmail: this.email
        }, () => {
          this.isPending = false
          proTopAlertService.success({
            message: $filter('translate')('REGISTER.REGISTRATION_SUCCESS'),
            timeout: 3
          })
          User.setData({unverifiedEmail: this.email})
          $state.go('app.dashboard.start')
        })
      })
    }

    return this
  }

  function config($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.post-register.set-email', {
      url: '/set-email',
      controllerAs: 'vm',
      controller: 'SetEmailController',
      templateUrl: 'post-register/set-email/set-email.tpl.html',
      resolve: {
        /* istanbul ignore next */
        redirect: (User, $state, $timeout, $q) => {
          /* istanbul ignore next */
          return User.getStatus().then((status) => {
            if (((angular.isDefined(status.email) && status.email) ||
              (angular.isDefined(status.unverifiedEmail) && status.unverifiedEmail)) || (
                angular.isDefined(status.hasPassword) && !status.hasPassword
              )) {
              return $state.go('app.dashboard.start')
            } else {
              return $q.resolve()
            }
          })
        }
      },
      data: {
        access: UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.LOGIN.REGISTER'
      }
    })
  }

  angular.module('profitelo.controller.post-register.set-email', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.services.login-state',
    'profitelo.services.resolvers.app.login.register',
    'profitelo.swaggerResources',
    'profitelo.services.commonSettings',
    'profitelo.services.pro-top-alert-service',
    'profitelo.services.pro-top-waiting-loader-service',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.interface.pro-input',
    'profitelo.controller.post-register.set-password'
  ])
    .config(config)
    .controller('SetEmailController', _controller)

}())
