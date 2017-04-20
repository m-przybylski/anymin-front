import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IExpertInviteEmployeesControllerScope, ExpertInviteEmployeesController} from './invite-employees.controller'
import expertInviteEmployeesModule from './invite-employees'
describe('Testing Controller: expertInviteEmployeesController', () => {

  let expertInviteEmployeesController: ExpertInviteEmployeesController
  let scope: IExpertInviteEmployeesControllerScope
  const uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }
  beforeEach(() => {
    angular.mock.module(expertInviteEmployeesModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
  }))

  beforeEach(() => {
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

      scope = <IExpertInviteEmployeesControllerScope>$rootScope.$new()

      expertInviteEmployeesController = $controller(ExpertInviteEmployeesController, {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })

  it('should exists', () => {
    return expect(!!expertInviteEmployeesController).toBe(true)
  })

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss')
    expertInviteEmployeesController.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

})
