import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {ExpertPayoutCompanyModalController, IExpertPayoutCompanyModalScope} from './payout-company.controller'
import expertPayoutCompanyModalModule from './payout-company'
describe('Testing Controller: expertPayoutCompanyController', () => {

  let expertPayoutCivilController: any
  let scope: IExpertPayoutCompanyModalScope
  const uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
    angular.mock.module(expertPayoutCompanyModalModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
  }))

  beforeEach(() => {
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

      scope = <IExpertPayoutCompanyModalScope>$rootScope.$new()

      expertPayoutCivilController = $controller(ExpertPayoutCompanyModalController, {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })

  it('should exists', () => {
    return expect(!!expertPayoutCivilController).toBe(true)
  })

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss')
    expertPayoutCivilController.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

})
