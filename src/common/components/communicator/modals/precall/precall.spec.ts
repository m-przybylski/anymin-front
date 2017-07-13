import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import preallcallPostpaidModalModule from './precall'
import {ViewsApi} from 'profitelo-api-ng/api/api'
import {IPreallcallModalControllerScope, PreallcallModalController} from './precall.controller'
import modalsModule from '../../../../services/modals/modals'
import {ModalsService} from '../../../../services/modals/modals.service'

describe('Testing Controller: precallPostpaidController', () => {

  let expertConsultationDetails: PreallcallModalController
  let scope: IPreallcallModalControllerScope
  const uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
    angular.mock.module(preallcallPostpaidModalModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
  }))

  beforeEach(() => {
    angular.mock.module(modalsModule)

    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$httpBackend_: ng.IHttpBackendService,
            _ViewsApi_: ViewsApi, _modalsService_: ModalsService) => {

      scope = <IPreallcallModalControllerScope>$rootScope.$new()

      expertConsultationDetails = $controller<PreallcallModalController>('precallPostpaidController', {
        $scope: scope,
        $uibModalInstance: uibModalInstance,
        httpBackend: _$httpBackend_,
        ViewsApi: _ViewsApi_,
        ModalsService: _modalsService_
      })
    })
  })

  it('should exists', () => {
    return expect(!!expertConsultationDetails).toBe(true)
  })

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss')
    expertConsultationDetails.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })
})
