namespace app.dashboard.settings.general {

  import IModalsService = profitelo.services.modals.IModalsService
  import IUrlService = profitelo.services.helper.IUrlService
  import AccountDetails = profitelo.api.AccountDetails
  import IUserService = profitelo.services.user.IUserService

  export class DashboardSettingsGeneralController implements ng.IController {

    public avatarImageSource: string
    public nickname: string
    public phoneNumber: string
    public email?: string
    public country: string
    public unverifiedEmail?: string
    public showUnverifiedEmail: boolean

    constructor(private modalsService: IModalsService, user: AccountDetails, private $state: ng.ui.IStateService, private urlService: IUrlService) {
      this.nickname = user.settings.nickname
      this.avatarImageSource = this.urlService.resolveFileUrl(user.settings.avatar || '')
      this.phoneNumber = user.msisdn
      this.email = user.email
      this.country = user.countryISO
      this.unverifiedEmail = user.unverifiedEmail
      this.showUnverifiedEmail = (typeof(this.unverifiedEmail) !== 'undefined' && this.unverifiedEmail !== '')
    }

    $onInit = () => {
    }

    public openBasicAccountSettingsModal = () => {
      this.modalsService.createBasicAccountSettingsModal(this.onModalClose)
    }

    public openGeneralPhoneSettingsModal = () => {
      this.modalsService.createGeneralPhoneSettingsModal(this.onModalClose)
    }

    public openGeneralEmailSettingsModal = () => {
      this.modalsService.createGeneralEmailSettingsModal(this.onModalClose)
    }

    public openGeneralCountrySettingsModal = () => {
      this.modalsService.createGeneralCountrySettingsModal(this.onModalClose)
    }

    private onModalClose = (cb: () => void) => {
      this.$state.reload().then(cb)
    }

  }

  angular.module('profitelo.controller.dashboard.settings.general', [
    'ui.router',
    'pascalprecht.translate',
    'profitelo.services.user',
    'ngLodash',
    'profitelo.services.url',
    'profitelo.services.modals'
  ])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.settings.general', {
      url: '/general',
      templateUrl: 'dashboard/settings/general/general.tpl.html',
      controller: 'dashboardSettingsGeneralController',
      controllerAs: 'vm',
      resolve: {
        user: (userService: IUserService) => {
          return userService.getUser()
        }
      },
      data: {
      }
    })
  })
  .controller('dashboardSettingsGeneralController', DashboardSettingsGeneralController)
}
