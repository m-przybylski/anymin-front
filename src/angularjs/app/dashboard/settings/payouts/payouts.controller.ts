// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-template
import { ModalsService } from '../../../../common/services/modals/modals.service';
import { Config } from '../../../../../config';
import { TranslatorService } from '../../../../common/services/translator/translator.service';
import { PayoutsService } from './payouts.service';
import { TopAlertService } from '../../../../common/services/top-alert/top-alert.service';
import { GetCompanyInvoiceDetails, GetPayoutMethod } from 'profitelo-api-ng/model/models';

// tslint:disable:member-ordering
export class DashboardSettingsPayoutsController implements ng.IController {
  public isAnyPayoutMethod = false;
  public isLoading: boolean;
  public isLoadingError = false;
  public payPalAccountEmail?: string;
  public bankAccountNumber?: string;
  public vatNumber: string;
  public companyName: string;
  public address: string;
  public postalCode: string;
  public city: string;
  public email: string;
  public isPlatformForExpert = Config.isPlatformForExpert;
  public invoiceDetailsButtonText: string = DashboardSettingsPayoutsController.invoiceDetailsButtonTranslations.add;

  private companyInvoiceDetails?: GetCompanyInvoiceDetails;
  private static readonly invoiceDetailsButtonTranslations = {
    add: 'SETTINGS.PAYOUTS.INVOICE_DETAILS.ADD_BUTTON',
    edit: 'SETTINGS.PAYOUTS.INVOICE_DETAILS.EDIT_BUTTON',
  };

  public static $inject = ['modalsService', 'translatorService', 'payoutsService', 'topAlertService'];

  constructor(
    private modalsService: ModalsService,
    private translatorService: TranslatorService,
    private payoutsService: PayoutsService,
    private topAlertService: TopAlertService,
  ) {}

  public $onInit = (): void => {
    this.getPayoutsSettings();
  };

  public getPayoutsSettings = (): void => {
    this.isLoading = true;
    this.isLoadingError = false;
    this.payoutsService
      .getPayoutMethods()
      .then(payoutMethod => {
        this.setPayoutMethod(payoutMethod);
        this.payoutsService
          .getCompanyPayoutsInvoiceDetails()
          .then(companyInvoiceDetails => {
            this.companyInvoiceDetails = companyInvoiceDetails;
            this.setPayoutInvoiceDetails(this.companyInvoiceDetails);
          })
          .catch(() => {
            this.isLoadingError = true;
          });
      })
      .catch(() => {
        this.isLoadingError = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  };

  public deletePaymentMethod = (): void => {
    this.modalsService.createConfirmAlertModal('SETTINGS.PAYMENTS.DELETE_METHOD.CONFIRM_MESSAGE', () => {
      this.payoutsService.putPayoutMethod().then(() => {
        this.isAnyPayoutMethod = false;
        this.showSuccessAlert();
      });
    });
  };

  public addPayoutMethod = (): void => {
    this.modalsService.createPayoutsMethodControllerModal(this.getPayoutsSettings);
  };

  public editCompanyInvoiceDetails = (): void => {
    this.modalsService.createCompanyInvoiceDetailsModal(this.getPayoutsSettings, this.companyInvoiceDetails);
  };

  private setPayoutMethod = (payoutMethod: GetPayoutMethod | undefined): void => {
    if (typeof payoutMethod !== 'undefined') {
      this.isAnyPayoutMethod = true;
      if (payoutMethod.payPalAccount) {
        this.payPalAccountEmail = payoutMethod.payPalAccount.email;
        this.bankAccountNumber = '';
      } else if (payoutMethod.bankAccount) {
        this.bankAccountNumber = payoutMethod.bankAccount.accountNumber;
        this.payPalAccountEmail = '';
      }
    }
  };

  private setPayoutInvoiceDetails = (companyInvoiceDetails: GetCompanyInvoiceDetails | undefined): void => {
    if (typeof companyInvoiceDetails !== 'undefined') {
      this.invoiceDetailsButtonText = DashboardSettingsPayoutsController.invoiceDetailsButtonTranslations.edit;
      this.vatNumber = companyInvoiceDetails.vatNumber;
      this.companyName = companyInvoiceDetails.companyName;
      const address = companyInvoiceDetails.address;
      this.address =
        address.address +
        ', ' +
        address.postalCode +
        ', ' +
        address.city +
        ', ' +
        this.translatorService.translate('COUNTRIES.' + address.countryISO);
      this.email = companyInvoiceDetails.email;
    }
  };

  private showSuccessAlert = (): void => {
    this.topAlertService.success({
      message: this.translatorService.translate('SETTINGS.PAYMENTS.DELETE_METHOD.SUCCESS_MESSAGE'),
      timeout: 2,
    });
  };
}
