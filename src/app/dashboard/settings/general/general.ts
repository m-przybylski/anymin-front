import * as angular from "angular"
import urlModule from "../../../../common/services/url/url"
import userModule from "../../../../common/services/user/user"
import modalsModule from "../../../../common/services/modals/modals"
import {UserService} from "../../../../common/services/user/user.service"
import {AccountDetails} from "profitelo-api-ng/model/models"
import {ModalsService} from "../../../../common/services/modals/modals.service"
import {UrlService} from "../../../../common/services/url/url.service"
export class DashboardSettingsGeneralController implements ng.IController {

  public avatarImageSource: string
  public nickname: string
  public phoneNumber: string
  public email?: string
  public country: string
  public unverifiedEmail?: string
  public showUnverifiedEmail: boolean

  constructor(private modalsService: ModalsService, user: AccountDetails, private $state: ng.ui.IStateService,
              private urlService: UrlService) {
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
  userModule,
  'ngLodash',
  urlModule,
  modalsModule
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.settings.general', {
      url: '/general',
      template: require('./general.jade')(),
      controller: 'dashboardSettingsGeneralController',
      controllerAs: 'vm',
      resolve: {
        user: (userService: UserService) => {
          return userService.getUser(true)
        }
      },
      data: {}
    })
  })
  .controller('dashboardSettingsGeneralController', DashboardSettingsGeneralController)
