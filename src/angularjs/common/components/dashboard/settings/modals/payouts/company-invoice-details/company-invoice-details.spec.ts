import * as angular from 'angular'
import {CompanyInvoiceDetailsModalController, ICompanyInvoiceDetailsModalControllerScope}
  from './company-invoice-details.controller'
import {IRootScopeService} from '../../../../../../services/root-scope/root-scope.service';
import {CompanyInvoiceDetailsModalService} from './company-invoice-details.service'
import SpyObj = jasmine.SpyObj
import {default as companyInvoiceDetailsModalModule} from './company-invoice-details'
import {TopAlertService} from '../../../../../../services/top-alert/top-alert.service'

describe('Testing Controller: CompanyInvoiceDetailsModalController', () => {

  let controller: CompanyInvoiceDetailsModalController
  let scope: ICompanyInvoiceDetailsModalControllerScope

  const $uibModalInstance = {
    dismiss: (): void => {},
    close: (): void => {}
  }
  const companyInvoiceDetailsModalService: SpyObj<CompanyInvoiceDetailsModalService> =
    jasmine.createSpyObj<CompanyInvoiceDetailsModalService>('companyInvoiceDetailsModalService',
      ['saveInvoiceDetails'])

  beforeEach(() => {
    angular.mock.module('ui.bootstrap')
    angular.mock.module(companyInvoiceDetailsModalModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeUrl')
    $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
  }))

  beforeEach(() => {

    inject(($rootScope: IRootScopeService,
            $controller: ng.IControllerService) => {

      scope = <ICompanyInvoiceDetailsModalControllerScope>$rootScope.$new()

      controller = $controller<CompanyInvoiceDetailsModalController>('companyInvoiceDetailsModalController', {
        $uibModalInstance,
        companyInvoiceDetailsModalService,
        $scope: scope
      })
    })
  })

  it('should exists', () => {
    expect(!!controller).toBe(true)
  })

  it('should close modal', () => {
    spyOn($uibModalInstance, 'dismiss')
    controller.onModalClose()
    expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

  it('should be form invalid', () => {
    controller.vatNumber = '1231231212'
    controller.name = 'name'
    controller.address = 'address'
    controller.postalCode = '12'
    controller.city = 'city'
    controller.email = 'email@com.pl'
    expect(controller.isFormValid()).toEqual(false)
  })

  it('should save company invoice details',
    inject(($q: ng.IQService, $controller: ng.IControllerService, topAlertService: TopAlertService) => {
    spyOn($uibModalInstance, 'dismiss')
    spyOn(topAlertService, 'success')
    scope.onModalCloseCallback = (): void => {}
      companyInvoiceDetailsModalService.saveInvoiceDetails.and.callFake(() => $q.resolve({}))
    controller = $controller<CompanyInvoiceDetailsModalController>('companyInvoiceDetailsModalController', {
      $uibModalInstance,
      companyInvoiceDetailsModalService,
      $scope: scope
    })
    controller.saveCompanyInvoiceDetails()
    scope.$apply()
    expect($uibModalInstance.dismiss).toHaveBeenCalled()
    expect(topAlertService.success).toHaveBeenCalled()
  }))

})
