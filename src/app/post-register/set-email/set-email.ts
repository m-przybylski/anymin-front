namespace profitelo.postRegister.setEmail {

  import IFilterService = profitelo.services.filter.IFilterService
  import ITopWaitingLoaderService = profitelo.services.topWaitingLoader.ITopWaitingLoaderService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IAccountApi = profitelo.api.IAccountApi
  import PatchAccount = profitelo.api.PatchAccount
  import Account = profitelo.api.Account

  function _controller($log: ng.ILogService, $filter: IFilterService, $state: ng.ui.IStateService,
                       topWaitingLoaderService: ITopWaitingLoaderService, User: any, topAlertService: ITopAlertService,
                       AccountApi: IAccountApi) {

    this.isPending = false
    this.rulesAccepted = false
    this.serverError = false
    this.alreadyCheck = false
    this.correctCode = false
    this.email = ''
    this.emailExist = false

    let _updateNewUserObject = (patchObject: PatchAccount, successCallback: (res: Account) => void) => {
      /* istanbul ignore next if */
      if (!this.isPending) {
        this.isPending = true
        topWaitingLoaderService.immediate()

        const accountId = User.getData('id')

        AccountApi.partialUpdateAccountRoute(accountId, patchObject).then(successCallback, (error) => {
          $log.error(error)
          this.isPending = false
          topWaitingLoaderService.stopLoader()
          topAlertService.error({
            message: $filter('translate')('INTERFACE.API_ERROR'),
            timeout: 4
          })
        })

      }
    }

    let _isEmailExists = (email: string): ng.IHttpPromise<{}> => {
      return AccountApi.getAccountEmailExistsRoute(email)
    }

    this.setNewEmail = () => {
      _isEmailExists(this.email).then((_response: any) => {
        this.emailExist = true
      }, () => {
        _updateNewUserObject({
          unverifiedEmail: this.email
        }, () => {
          this.isPending = false
          topAlertService.success({
            message: $filter('translate')('REGISTER.REGISTRATION_SUCCESS'),
            timeout: 3
          })
          User.setData({unverifiedEmail: this.email})
          $state.go('app.dashboard.client.favourites')
        })
      })
    }

    return this
  }

  function config($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
    $stateProvider.state('app.post-register.set-email', {
      url: '/set-email',
      controllerAs: 'vm',
      controller: 'SetEmailController',
      templateUrl: 'post-register/set-email/set-email.tpl.html',
      resolve: {
        /* istanbul ignore next */
        redirect: (User: any, $state: ng.ui.IStateService, $q: ng.IQService) => {
          /* istanbul ignore next */
          return User.getStatus().then((status: any) => {
            if (((angular.isDefined(status.email) && status.email) ||
              (angular.isDefined(status.unverifiedEmail) && status.unverifiedEmail)) || (
                angular.isDefined(status.hasPassword) && !status.hasPassword
              )) {
              return $state.go('app.dashboard.client.favourites')
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
    'profitelo.resolvers.login-register',
    'profitelo.api.AccountApi',
    'profitelo.services.commonSettings',
    'profitelo.services.top-alert',
    'profitelo.services.pro-top-waiting-loader-service',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.interface.pro-input',
    'profitelo.controller.post-register.set-password'
  ])
    .config(config)
    .controller('SetEmailController', _controller)

}
