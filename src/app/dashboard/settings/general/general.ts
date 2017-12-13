import * as angular from 'angular'
import urlModule from '../../../../common/services/url/url'
import userModule from '../../../../common/services/user/user'
import modalsModule from '../../../../common/services/modals/modals'
import {UserService} from '../../../../common/services/user/user.service'
import {AccountDetails} from 'profitelo-api-ng/model/models'
import {ModalsService} from '../../../../common/services/modals/modals.service'
import {Config} from '../../../config';

export class DashboardSettingsGeneralController implements ng.IController {

  public avatarImageSource?: string
  public nickname?: string
  public phoneNumber: string
  public email?: string
  public country: string
  public unverifiedEmail?: string
  public showUnverifiedEmail: boolean
  public isPlatformForExpert: boolean = Config.isPlatformForExpert

  constructor(private modalsService: ModalsService, user: AccountDetails, private $state: ng.ui.IStateService) {
    this.nickname = user.settings.nickname
    this.avatarImageSource = user.settings.avatar
    this.phoneNumber = user.msisdn
    this.email = user.email
    this.country = user.countryISO
    this.unverifiedEmail = user.unverifiedEmail
    this.showUnverifiedEmail = (typeof(this.unverifiedEmail) !== 'undefined' && this.unverifiedEmail !== '')
  }

  public openBasicAccountSettingsModal = (): void => {
    this.modalsService.createBasicAccountSettingsModal(this.onModalClose)
  }

  public openGeneralPhoneSettingsModal = (): void => {
    this.modalsService.createGeneralPhoneSettingsModal(this.onModalClose)
  }

  public openGeneralEmailSettingsModal = (): void => {
    this.modalsService.createGeneralEmailSettingsModal(this.onModalClose)
  }

  public openGeneralCountrySettingsModal = (): void => {
    // TODO Uncomment If we allow user change Country
    // this.modalsService.createGeneralCountrySettingsModal(this.onModalClose)
  }

  private onModalClose = (cb: () => void): void => {
    this.$state.reload().finally(cb)
  }

}

angular.module('profitelo.controller.dashboard.settings.general', [
  'ui.router',
  'pascalprecht.translate',
  userModule,

  urlModule,
  modalsModule
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.settings.general', {
      url: '/general',
      template: require('./general.pug')(),
      controller: 'dashboardSettingsGeneralController',
      controllerAs: 'vm',
      resolve: {
        user: (userService: UserService): ng.IPromise<AccountDetails> => userService.getUser(true)
      },
      data: {}
    })
  })
  .controller('dashboardSettingsGeneralController', DashboardSettingsGeneralController)
