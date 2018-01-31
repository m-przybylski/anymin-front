import { ModalsService } from '../../../../common/services/modals/modals.service';
import { Config } from '../../../../../config';
import { TranslatorService } from '../../../../common/services/translator/translator.service';
import { TopAlertService } from '../../../../common/services/top-alert/top-alert.service';
import { GetPayoutMethodDto } from 'profitelo-api-ng/model/models';
import { PayoutsService } from './payouts.service';

// tslint:disable:member-ordering
export class DashboardSettingsPayoutsController implements ng.IController {
  public isAnyPayoutMethod = false;
  public isLoading: boolean;
  public isLoadingError = false;
  public payPalAccountEmail?: string;
  public bankAccountNumber?: string;
  public isPlatformForExpert = Config.isPlatformForExpert;

  public static $inject = ['modalsService', 'translatorService', 'payoutsService', 'topAlertService'];

    constructor(private modalsService: ModalsService,
              private translatorService: TranslatorService,
              private payoutsService: PayoutsService,
              private topAlertService: TopAlertService) {}

  public $onInit = (): void => {
    this.getPayoutMethods();
  }

  public getPayoutMethods = (): void => {
    this.isLoading = true;
    this.isLoadingError = false;
    this.payoutsService.getPayoutMethods().then(payoutMethod => {
      this.setPayoutMethod(payoutMethod);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  public deletePaymentMethod = (): void => {
    const confirmWindowMessage =
      this.translatorService.translate('SETTINGS.PAYMENTS.DELETE_METHOD.CONFIRM_MESSAGE');
    if (confirm(confirmWindowMessage)) {
      this.payoutsService.putPayoutMethod().then(() => {
        this.isAnyPayoutMethod = false;
        this.showSuccessAlert();
      });
    }
  }

  public addPayoutMethod = (): void => {
    this.modalsService.createPayoutsMethodControllerModal(this.getPayoutMethods);
  }

  private setPayoutMethod = (payoutMethod: GetPayoutMethodDto): void => {
    this.isAnyPayoutMethod = true;
    if (payoutMethod.payPalAccount) {
      this.payPalAccountEmail = payoutMethod.payPalAccount.email;
      this.bankAccountNumber = '';
    } else if (payoutMethod.bankAccount) {
      this.bankAccountNumber = payoutMethod.bankAccount.accountNumber;
      this.payPalAccountEmail = '';
    }
  }

  private showSuccessAlert = (): void => {
    this.topAlertService.success({
      message: this.translatorService.translate('SETTINGS.PAYMENTS.DELETE_METHOD.SUCCESS_MESSAGE'),
      timeout: 2
    });
  }

}
