import * as angular from 'angular'
import apiModule from 'profitelo-api-ng/api.module'
import {PayoutsApi} from 'profitelo-api-ng/api/api'
import {JValue} from 'profitelo-api-ng/model/models'
import {CommonSettingsService} from '../../../../../../services/common-settings/common-settings.service'
import commonSettingsModule from '../../../../../../services/common-settings/common-settings'
import inputModule from '../../../../../interface/input/input'

export interface IPayoutsPayPalControllerScope extends ng.IScope {
  callback: () => void
}

export class PayoutsPayPalController implements ng.IController {
  isNavbar: boolean = true
  isFullscreen: boolean = true
  isPayoutBankMethod: boolean = false
  isPayoutPaypalMethod: boolean = false
  payPalEmail: string = ''
  emailPattern = this.CommonSettingsService.localSettings.mailPattern

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private $scope: IPayoutsPayPalControllerScope,
              private PayoutsApi: PayoutsApi,
              private CommonSettingsService: CommonSettingsService) {
  }

  public checkIsDisabled = (): boolean => {
    return this.emailPattern.test(this.payPalEmail)
  }

  public choosePayoutBankMethod = (): void => {
    this.isPayoutBankMethod = true
    this.isPayoutPaypalMethod = false
  }

  public addPayPalAccount = (): void => {
    this.PayoutsApi.postPayPalAccountPayoutMethodRoute({
      email: this.payPalEmail,
      isDefault: true
    }).then(this.onPostPayPalAccountSucceed, this.onPostPayPalAccountError)
  }

  private onPostPayPalAccountSucceed = (_response: ng.IPromise<JValue>): void => {
    this.$scope.callback()
    this.$uibModalInstance.dismiss('cancel')
  }

  private onPostPayPalAccountError = (error: any): void => {
    this.$uibModalInstance.dismiss('cancel')
    throw new Error('Can not add new payouts method - paypal account: ' + error)
  }

  public choosePayoutPaypalMethod = (): void => {
    this.isPayoutPaypalMethod = true
    this.isPayoutBankMethod = false
  }

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel')
  }

}

angular.module('profitelo.components.dashboard.settings.modals.payouts.payouts-pay-pal', [
  'ui.bootstrap',
  apiModule,
  commonSettingsModule,
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable',
  inputModule
])
  .controller('payoutsPayPalController', PayoutsPayPalController)
