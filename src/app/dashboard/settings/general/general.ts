namespace app.dashboard.settings.general {

  import IModalsService = profitelo.services.modals.IModalsService
  import IUrlService = profitelo.services.helper.IUrlService

  export class DashboardSettingsGeneralController implements ng.IController {

    public avatarImageSource: string
    public nickname: string
    public phoneNumber: string
    public email: string
    public country: string
    public unverifiedEmail: string
    public showUnverifiedEmail: boolean

    constructor(private modalsService: IModalsService, UserData: any, private $state: ng.ui.IStateService, private urlService: IUrlService) {
      this.nickname = UserData.settings.nickname
      this.avatarImageSource = this.urlService.resolveFileUrl(UserData.settings.avatar)
      this.phoneNumber = UserData.msisdn
      this.email = UserData.email
      this.country = UserData.countryISO
      this.unverifiedEmail = UserData.unverifiedEmail
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
    'c7s.ng.userAuth',
    'ngLodash',
    'profitelo.services.url',
    'profitelo.services.modals'
  ])
  .config(($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) => {
    $stateProvider.state('app.dashboard.settings.general', {
      url: '/general',
      templateUrl: 'dashboard/settings/general/general.tpl.html',
      controller: 'dashboardSettingsGeneralController',
      controllerAs: 'vm',
      resolve: {
        UserData: (User: any) => {
          return User.getStatus(true)
        }
      },
      data: {
        access: UserRolesProvider.getAccessLevel('user')
      }
    })
  })
  .controller('dashboardSettingsGeneralController', DashboardSettingsGeneralController)
}
