import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {ViewsApi} from 'profitelo-api-ng/api/api'
import modalsModule from '../../../../services/modals/modals'
import {ModalsService} from '../../../../services/modals/modals.service'
import {IPrecallModalControllerScope, PrecallModalController} from './precall.controller'
import precallModalModule from './precall'
import {ClientCallService} from '../../call-services/client-call.service'

describe('Testing Controller: precallModalController', () => {

  let expertConsultationDetails: PrecallModalController
  let scope: IPrecallModalControllerScope
  const uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  const clientCallService: ClientCallService = {
  } as ClientCallService

  beforeEach(() => {
    angular.mock.module(precallModalModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
    $provide.value('clientCallService', clientCallService)
  }))

  beforeEach(() => {
    angular.mock.module(modalsModule)

    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$httpBackend_: ng.IHttpBackendService,
            _ViewsApi_: ViewsApi, _modalsService_: ModalsService) => {

      scope = <IPrecallModalControllerScope>$rootScope.$new()

      expertConsultationDetails = $controller<PrecallModalController>('precallModalController', {
        $scope: scope,
        $uibModalInstance: uibModalInstance,
        httpBackend: _$httpBackend_,
        ViewsApi: _ViewsApi_,
        ModalsService: _modalsService_,
        clientCallService: clientCallService
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
