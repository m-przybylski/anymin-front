namespace app.dashboard.settings.general {

  import IModalsService = profitelo.services.modals.IModalsService
  import IUrlService = profitelo.services.helper.IUrlService

  export class DashboardSettingsGeneralController implements ng.IController {

    public user: any
    public avatarImageSource: string

    constructor(private modalsService: IModalsService, UserData: any, private $state: ng.ui.IStateService, private urlService: IUrlService) {
      this.user = UserData
      this.avatarImageSource = this.urlService.resolveFileUrl(this.user.settings.avatar)
    }

    $onInit = () => {
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
      this.$state.reload().then(() => {
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
