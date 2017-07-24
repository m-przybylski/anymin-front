import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {AccountApiMock} from 'profitelo-api-ng/api/api'
import {EditCompanyInvoiceController, IEditCompanyInvoiceControllerScope} from './edit-company-invoice'
import {CompanyInfo} from 'profitelo-api-ng/model/models'

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

      AccountApiMock.getCompanyInfoRoute(200, <CompanyInfo>{
        address: {
          street: 'Grow Street',
          number: '13',
          zipCode: '42-200',
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
    AccountApiMock.getCompanyInfoRoute(404, <CompanyInfo>{})
    expect(() => {
      controller = controllerService<EditCompanyInvoiceController>('editCompanyInvoiceController', {})
      httpBackend.flush()
    }).toThrow()

  })

  it('should edit invoice', () => {
    spyOn(scope, 'callback')
    AccountApiMock.postCompanyInfoRoute(200, <CompanyInfo>{})
    controller.editInvoice()
    httpBackend.flush()
    expect(scope.callback).toHaveBeenCalled()
  })

  it('should throw error - edit invoice', () => {
    AccountApiMock.postCompanyInfoRoute(404, <CompanyInfo>{})
    expect(() => {
      controller.editInvoice()
      scope.$digest()
      httpBackend.flush()
    }).toThrow()
  })

})
