import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {AccountApiMock} from 'profitelo-api-ng/api/api'
import {EditCompanyInvoiceController, IEditCompanyInvoiceControllerScope} from './edit-company-invoice'
import {GetInvoiceDetails} from 'profitelo-api-ng/model/models'

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

    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService,
            _AccountApiMock_: AccountApiMock, $httpBackend: ng.IHttpBackendService) => {
      httpBackend = $httpBackend
      AccountApiMock = _AccountApiMock_
      controllerService = $controller
      scope = <IEditCompanyInvoiceControllerScope>$rootScope.$new()
      scope.callback = (): boolean => true
      const injectors = {
        $scope: scope,
        $uibModalInstance: $uibModalInstance
      }

      AccountApiMock.getInvoiceDetailsRoute(200, <GetInvoiceDetails>{
        address: {
          street: 'Grow Street',
          number: '13',
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
    AccountApiMock.getInvoiceDetailsRoute(404, <GetInvoiceDetails>{})
    expect(() => {
      controller = controllerService<EditCompanyInvoiceController>('editCompanyInvoiceController', {})
      httpBackend.flush()
    }).toThrow()

  })

  it('should edit invoice', () => {
    spyOn(scope, 'callback')
    AccountApiMock.postInvoiceDetailsRoute(200, <GetInvoiceDetails>{})
    controller.editInvoice()
    httpBackend.flush()
    expect(scope.callback).toHaveBeenCalled()
  })

  it('should throw error - edit invoice', () => {
    AccountApiMock.postInvoiceDetailsRoute(404, <GetInvoiceDetails>{})
    expect(() => {
      controller.editInvoice()
      scope.$digest()
      httpBackend.flush()
    }).toThrow()
  })

})
