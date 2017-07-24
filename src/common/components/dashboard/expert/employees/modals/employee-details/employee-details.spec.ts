import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IExpertEmployeeDetailsModalScope, ExpertEmployeeDetailsModalController} from './employee-details.controller'
describe('Testing Controller: expertEmployeeDetailsModal', () => {

  let controller: ExpertEmployeeDetailsModalController
  let scope: IExpertEmployeeDetailsModalScope
  const uibModalInstance = {
    dismiss: (): void => {

    },
    close: (): void => {

    }
  }

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
  }))

  beforeEach(() => {
    angular.mock.module('profitelo.components.dashboard.expert.employees.modals.employee-details')
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$httpBackend_: ng.IHttpBackendService) => {

      scope = <IExpertEmployeeDetailsModalScope>$rootScope.$new()

      controller = $controller<ExpertEmployeeDetailsModalController>('expertEmployeeDetailsModal', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance,
        'httpBackend': _$httpBackend_
      })
    })
  })

  it('should exists', () => {
    return expect(!!controller).toBe(true)
  })

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss')
    controller.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

})
