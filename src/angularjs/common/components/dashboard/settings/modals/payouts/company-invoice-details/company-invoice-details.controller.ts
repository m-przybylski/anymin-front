// tslint:disable:prefer-method-signature
// tslint:disable:no-shadowed-variable
// tslint:disable:deprecation
import { CompanyInvoiceDetailsModalService } from './company-invoice-details.service';
import { GetCompanyInvoiceDetails, PostCompanyInvoiceDetails } from 'profitelo-api-ng/model/models';
import { TranslatorService } from '../../../../../../services/translator/translator.service';
import { TopAlertService } from '../../../../../../services/top-alert/top-alert.service';
import { CommonSettingsService } from '../../../../../../services/common-settings/common-settings.service';
import { httpCodes } from '../../../../../../classes/http-codes';

export interface ICompanyInvoiceDetailsModalControllerScope extends ng.IScope {
  onModalCloseCallback: () => void;
  companyInvoiceDetails?: GetCompanyInvoiceDetails;
}

interface ICountry {
  name: string;
  value: string;
}

export class CompanyInvoiceDetailsModalController implements ng.IController {

  public static $inject = ['$uibModalInstance', '$scope', 'companyInvoiceDetailsModalService', 'translatorService',
    'topAlertService', 'CommonSettingsService'];

  public vatNumber = '';
  public name = '';
  public address = '';
  public postalCode = '';
  public city = '';
  public email = '';
  public countryList: ICountry[] = [];
  public selectedCountry: ICountry;
  public isLoading = false;
  public isBackendValidationError = false;

  private onModalCloseCallback: () => void;
  private companyInvoiceDetails?: GetCompanyInvoiceDetails;
  private vatNumberPattern: RegExp;
  private emailPattern: RegExp;
  private postalCodePattern: RegExp;

  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private $scope: ICompanyInvoiceDetailsModalControllerScope,
              private companyInvoiceDetailsModalService: CompanyInvoiceDetailsModalService,
              private translatorService: TranslatorService,
              private topAlertService: TopAlertService,
              private CommonSettingsService: CommonSettingsService) {

    this.companyInvoiceDetails = this.$scope.companyInvoiceDetails;
    this.onModalCloseCallback = this.$scope.onModalCloseCallback;

    this.vatNumberPattern = this.CommonSettingsService.localSettings.vatNumberPattern;
    this.emailPattern = this.CommonSettingsService.localSettings.emailPattern;
    this.postalCodePattern = this.CommonSettingsService.localSettings.postalCodePattern;

    this.countryList = [{
      name: this.translatorService.translate('COUNTRIES.PL'),
      value: 'PL'
    }];
    this.selectedCountry = this.countryList[0];

    this.assignInvoiceDetailsValues();

  }

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel');
  }

  public saveCompanyInvoiceDetails = (): void => {
    this.isLoading = true;
    this.companyInvoiceDetailsModalService.saveInvoiceDetails(this.createCompanyInvoiceDetailsModel())
      .then(this.onSaveCompanyInvoiceDetailsSucceed)
      .catch((error) => {
        if (error.status === httpCodes.badRequest
          && error.data.code === this.CommonSettingsService.errorCodes.illegalArgument) {
          this.isBackendValidationError = true;
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  public isVatNumberValid = (): boolean => this.vatNumberPattern.test(this.vatNumber.replace(/-|\s/g, ''));

  public isNameValid = (): boolean => this.name.length > 0;

  public isAddressValid = (): boolean => this.address.length > 0;

  public isPostalCodeValid = (): boolean => this.postalCodePattern.test(this.postalCode);

  public isCityValid = (): boolean => this.city.length > 0;

  public isEmailValid = (): boolean => this.emailPattern.test(this.email);

  public isFormValid = (): boolean =>
    this.isVatNumberValid()
    && this.isNameValid()
    && this.isAddressValid()
    && this.isPostalCodeValid()
    && this.isCityValid()
    && this.isEmailValid()

  public onVatInputChange = (): void => {
    this.isBackendValidationError = false;
  }

  private createCompanyInvoiceDetailsModel = (): PostCompanyInvoiceDetails => (
    {
      vatNumber: this.vatNumber.replace(/-|\s/g, ''),
      companyName: this.name,
      address: {
        address: this.address,
        postalCode: this.postalCode,
        city: this.city,
        countryISO: this.selectedCountry.value.toUpperCase()
      },
      email: this.email
    }
  )

  private showSuccessAlert = (): void => {
    this.topAlertService.success({
      message: this.translatorService.translate('DASHBOARD.SETTINGS.PAYOUTS_METHOD.INVOICE_DETAILS.SUCCESS_MESSAGE'),
      timeout: 2
    });
  }

  private onSaveCompanyInvoiceDetailsSucceed = (): void => {
    this.onModalCloseCallback();
    this.$uibModalInstance.dismiss('cancel');
    this.showSuccessAlert();
  }

  private assignInvoiceDetailsValues = (): void => {
    if (this.companyInvoiceDetails) {
      this.vatNumber = this.companyInvoiceDetails.vatNumber;
      this.name = this.companyInvoiceDetails.companyName;
      this.address = this.companyInvoiceDetails.address.address;
      this.postalCode = this.companyInvoiceDetails.address.postalCode;
      this.city = this.companyInvoiceDetails.address.city;
      this.email = this.companyInvoiceDetails.email;
      this.selectedCountry = {
        name: this.translatorService.translate('COUNTRIES.' + this.companyInvoiceDetails.address.countryISO),
        value: this.companyInvoiceDetails.address.countryISO
      };
    }
  }

}
