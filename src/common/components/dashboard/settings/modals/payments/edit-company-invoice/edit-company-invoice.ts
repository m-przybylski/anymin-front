import * as angular from 'angular'
import * as _ from 'lodash'
import {IPrimaryDropdownListElement} from '../../../../../interface/dropdown-primary/dropdown-primary'
import apiModule from 'profitelo-api-ng/api.module'
import {AccountApi} from 'profitelo-api-ng/api/api'
import {CompanyInfo} from 'profitelo-api-ng/model/models'
import 'common/components/invoice/invoice-company'
import 'common/components/interface/preloader/preloader'
import inputModule from '../../../../../interface/input/input'

export interface IEditCompanyInvoiceControllerScope extends ng.IScope {
  callback: () => void
}

export class EditCompanyInvoiceController implements ng.IController {

  isNavbar: boolean = true
  isFullscreen: boolean = true
  companyName: string
  street: string
  apartmentNumber: string
  postalCode: string
  vatNumber: string
  city: string
  selectedCountry?: IPrimaryDropdownListElement
  countryISO: string
  countryList: IPrimaryDropdownListElement[] = [{
    name: 'Poland',
    value: 'PL'
  }]
  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel')
  }

  public onFormSucceed = (): void => {
    this.$uibModalInstance.dismiss('cancel')
  }

  public editInvoice = (): void => {
    this.AccountApi.postCompanyInfoRoute({
      vatNumber: this.vatNumber,
      companyName: this.companyName,
      // TODO On GUS API Implement
      vat: 23,
      address: {
        number: this.apartmentNumber,
        city: this.city,
        zipCode: this.postalCode,
        countryISO: this.countryISO,
        street: this.street
      }
    }).then((_response: CompanyInfo) => {
      this.$scope.callback()
      this.$uibModalInstance.dismiss('cancel')
    }, (error: any) => {
      this.$uibModalInstance.dismiss('cancel')
      throw new Error('Can not post company info: ' + error)
    })
  }

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private $scope: IEditCompanyInvoiceControllerScope, private AccountApi: AccountApi) {

    AccountApi.getCompanyInfoRoute().then((response) => {
      this.vatNumber = response.vatNumber
      this.companyName = response.companyName
      this.street = response.address.street
      this.apartmentNumber = response.address.number
      this.postalCode = response.address.zipCode
      this.city = response.address.city

      this.selectedCountry = _.find(
        this.countryList, (countryListElement: {value: string, name: string}) =>
        countryListElement.value === response.address.countryISO)
      if (this.selectedCountry) {
        this.countryISO = this.selectedCountry.value
      }
    }, (error) => {
      this.$uibModalInstance.dismiss('cancel')
      throw new Error('Can not get company info: ' + error)
    })

  }
}

angular.module('profitelo.components.dashboard.settings.modals.payments.edit-company-invoice', [
  'ui.bootstrap',
  apiModule,
  'profitelo.components.dashboard.invoice',
  'profitelo.components.interface.preloader',
  inputModule
])
  .controller('editCompanyInvoiceController', EditCompanyInvoiceController)
