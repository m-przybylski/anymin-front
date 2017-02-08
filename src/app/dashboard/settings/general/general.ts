namespace app.dashboard.settings.general {

  import IModalsService = profitelo.services.modals.IModalsService
  import IUrlService = profitelo.services.helper.IUrlService

  class DashboardSettingsGeneralController implements ng.IController {

    public user
    public avatarImageSource: string

    constructor(private modalsService: IModalsService, private User, private urlService: IUrlService) {}

    $onInit = () => {
     this.user = this.User.getAllData()
     this.avatarImageSource = this.urlService.resolveFileUrl(this.user.settings.avatar)
    }

    public openBasicAccountSettingsModal = () => {
      this.modalsService.createBasicAccountSettingsModal(this.getUserData)
    }

    public openGeneralPhoneSettingsModal = () => {
      this.modalsService.createGeneralPhoneSettingsModal()
    }

    public openGeneralEmailSettingsModal = () => {
      this.modalsService.createGeneralEmailSettingsModal()
    }

    public openGeneralCountrySettingsModal = () => {
      this.modalsService.createGeneralCountrySettingsModal()
    }

    private getUserData = (cb: Function) => {
      this.User.getStatus(true).then(() => {
        this.user = this.User.getAllData()
        this.avatarImageSource = this.urlService.resolveFileUrl(this.user.settings.avatar)
        cb()
      })
    }

  }

  angular.module('profitelo.controller.dashboard.settings.general', [
    'ui.router',
    'c7s.ng.userAuth',
    'ngLodash',
    'profitelo.services.url',
    'profitelo.services.modals'
  ])
  .config(function ($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.settings.general', {
      url: '/general',
      templateUrl: 'dashboard/settings/general/general.tpl.html',
      controller: 'DashboardSettingsGeneralController',
      controllerAs: 'vm',
      data: {
        access: UserRolesProvider.getAccessLevel('user')
      }
    })
  })
  .controller('DashboardSettingsGeneralController', DashboardSettingsGeneralController)
}
