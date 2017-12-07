import {ModalsService} from '../../../../common/services/modals/modals.service'
import {Config} from '../../../config'
import {TranslatorService} from '../../../../common/services/translator/translator.service'
import {PayoutsService} from './payouts.service'
import {ErrorHandlerService} from '../../../../common/services/error-handler/error-handler.service'
import {TopAlertService} from '../../../../common/services/top-alert/top-alert.service'
import {httpCodes} from '../../../../common/classes/http-codes'

export class DashboardSettingsPayoutsController implements ng.IController {
  public isAnyPayoutMethod: boolean = false
  public isLoading: boolean = true
  public isLoadingError: boolean = false
  public payPalAccount?: string
  public bankAccount?: string
  public isPlatformForExpert: boolean = Config.isPlatformForExpert

  /* @ngInject */
  constructor(private modalsService: ModalsService,
              private translatorService: TranslatorService,
              private payoutsService: PayoutsService,
              private errorHandler: ErrorHandlerService,
              private topAlertService: TopAlertService,
              private $log: ng.ILogService) {}

  $onInit = (): void => {
    this.getPayoutMethods()
  }

  public getPayoutMethods = (): void => {
    this.isLoading = true
    this.isLoadingError = false
    this.payoutsService.getPayoutMethods().then(payoutMethods => {
      this.isAnyPayoutMethod = true
      if (payoutMethods.payPalAccount) {
        this.payPalAccount = payoutMethods.payPalAccount.email
        this.bankAccount = ''
      } else if (payoutMethods.bankAccount) {
        this.bankAccount = payoutMethods.bankAccount.accountNumber
        this.payPalAccount = ''
      }
    }).catch(error => {
      if (error.status !== httpCodes.notFound) {
        this.$log.error('Can not get payouts methods', error)
        this.isLoadingError = true
      }
    }).finally(() => {
      this.isLoading = false
    })
  }

  public deletePaymentMethod = (): void => {
    const confirmWindowMessage: string =
      this.translatorService.translate('SETTINGS.PAYMENTS.DELETE_METHOD.CONFIRM_MESSAGE')
    if (confirm(confirmWindowMessage)) {
      this.payoutsService.putPayoutMethod().then(() => {
        this.isAnyPayoutMethod = false
        this.topAlertService.success({
          message: this.translatorService.translate('SETTINGS.PAYMENTS.DELETE_METHOD.SUCCESS_MESSAGE'),
          timeout: 2
        })
      }).catch( (error) => {
        this.errorHandler.handleServerError(error, 'Can not delete payout method')
      })
    }
  }

  public addPayoutMethod = (): void => {
    this.modalsService.createPayoutsMethodControllerModal(this.getPayoutMethods)
  }

}
