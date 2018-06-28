// tslint:disable:prefer-template
// tslint:disable:prefer-method-signature
// tslint:disable:no-shadowed-variable
// tslint:disable:no-import-side-effect
// tslint:disable:no-implicit-dependencies
// tslint:disable:no-any
// tslint:disable:deprecation
import * as angular from 'angular';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { IPrimaryDropdownListElement } from '../../../../../interface/dropdown-primary/dropdown-primary';
import apiModule from 'profitelo-api-ng/api.module';
import { AccountApi } from 'profitelo-api-ng/api/api';
import { GetCompanyInvoiceDetails } from 'profitelo-api-ng/model/models';
import 'angularjs/common/components/invoice/invoice-company';
import 'angularjs/common/components/interface/preloader/preloader';
import inputModule from '../../../../../interface/input/input';

export interface IEditCompanyInvoiceControllerScope extends ng.IScope {
  callback: () => void;
}

// tslint:disable:member-ordering
export class EditCompanyInvoiceController implements ng.IController {

  public isNavbar = true;
  public isFullscreen = true;
  public companyName: string;
  public address: string;
  public postalCode: string;
  public vatNumber: string;
  public email: string;
  public city: string;
  public selectedCountry?: IPrimaryDropdownListElement;
  public countryISO: string;
  public countryList: IPrimaryDropdownListElement[] = [{
    name: 'Poland',
    value: 'PL'
  }];
  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel');
  }

  public onFormSucceed = (): void => {
    this.$uibModalInstance.dismiss('cancel');
  }

  public editInvoice = (): void => {
    this.AccountApi.postCompanyPayoutInvoiceDetailsRoute({
      vatNumber: this.vatNumber,
      companyName: this.companyName,
      email: this.email,
      // TODO On GUS API Implement
      address: {
        address: this.address,
        city: this.city,
        postalCode: this.postalCode,
        countryISO: this.countryISO,
      }
    }).then((_response: GetCompanyInvoiceDetails) => {
      this.$scope.callback();
      this.$uibModalInstance.dismiss('cancel');
    }, (error: any) => {
      this.$uibModalInstance.dismiss('cancel');
      throw new Error('Can not post company info: ' + String(error));
    });
  }

  public static $inject = ['$uibModalInstance', '$scope', 'AccountApi'];

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private $scope: IEditCompanyInvoiceControllerScope, private AccountApi: AccountApi) {

    AccountApi.getCompanyPayoutInvoiceDetailsRoute().then((response) => {
      this.vatNumber = response.vatNumber;
      this.companyName = response.companyName;
      this.address = response.address.address;
      this.postalCode = response.address.postalCode;
      this.city = response.address.city;
      this.email = response.email;

      this.selectedCountry = _.find(
        this.countryList, (countryListElement: {value: string, name: string}) =>
        countryListElement.value === response.address.countryISO);
      if (this.selectedCountry) {
        this.countryISO = this.selectedCountry.value;
      }
    }, (error) => {
      this.$uibModalInstance.dismiss('cancel');
      throw new Error('Can not get company info: ' + String(error));
    });

  }
}

angular.module('profitelo.components.dashboard.settings.modals.payments.edit-company-invoice', [
  'ui.bootstrap',
  apiModule,
  'profitelo.components.dashboard.invoice',
  'profitelo.components.interface.preloader',
  inputModule
])
  .controller('editCompanyInvoiceController', EditCompanyInvoiceController);
