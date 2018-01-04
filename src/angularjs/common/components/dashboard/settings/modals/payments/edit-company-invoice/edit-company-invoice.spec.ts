import * as angular from 'angular'

import {AccountApiMock} from 'profitelo-api-ng/api/api'
import {EditCompanyInvoiceController, IEditCompanyInvoiceControllerScope} from './edit-company-invoice'
import {GetCompanyInvoiceDetails} from 'profitelo-api-ng/model/models'
import {httpCodes} from '../../../../../../classes/http-codes'

describe('Testing Controller: EditCompanyInvoiceController', () => {

  let controller: EditCompanyInvoiceController
  let scope: IEditCompanyInvoiceControllerScope
  let httpBackend: ng.IHttpBackendService
  let AccountApiMock: AccountApiMock
  let controllerService: ng.IControllerService
  const $uibModalInstance: any =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeUrl')
    $provide.value('AccountApiMock', AccountApiMock)
  }))

  beforeEach(() => {
    angular.mock.module('ui.bootstrap')
    angular.mock.module('profitelo.components.dashboard.settings.modals.payments.edit-company-invoice')

    inject(($rootScope: any, $controller: ng.IControllerService,
            _AccountApiMock_: AccountApiMock, $httpBackend: ng.IHttpBackendService) => {
      httpBackend = $httpBackend
      AccountApiMock = _AccountApiMock_
      controllerService = $controller
      scope = <IEditCompanyInvoiceControllerScope>$rootScope.$new()
      scope.callback = (): boolean => true
      const injectors = {
        $uibModalInstance,
        $scope: scope
      }

      AccountApiMock.getCompanyPayoutInvoiceDetailsRoute(httpCodes.ok, <GetCompanyInvoiceDetails>{
        address: {
          address: 'Grow Street 13',
          postalCode: '42-200',
          city: 'Zagacie'
        }})

      controller = controllerService<EditCompanyInvoiceController>('editCompanyInvoiceController', injectors)
      httpBackend.flush()
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })

  it('should throw error on component initialize', () => {
    AccountApiMock.getCompanyPayoutInvoiceDetailsRoute(httpCodes.notFound, <GetCompanyInvoiceDetails>{})
    expect(() => {
      controller = controllerService<EditCompanyInvoiceController>('editCompanyInvoiceController', {})
      httpBackend.flush()
    }).toThrow()

  })

  it('should edit invoice', () => {
    spyOn(scope, 'callback')
    AccountApiMock.postCompanyPayoutInvoiceDetailsRoute(httpCodes.ok, <GetCompanyInvoiceDetails>{})
    controller.editInvoice()
    httpBackend.flush()
    expect(scope.callback).toHaveBeenCalled()
  })

  it('should throw error - edit invoice', () => {
    AccountApiMock.postCompanyPayoutInvoiceDetailsRoute(httpCodes.notFound, <GetCompanyInvoiceDetails>{})
    expect(() => {
      controller.editInvoice()
      scope.$digest()
      httpBackend.flush()
    }).toThrow()
  })

})
