import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {ViewsApi} from 'profitelo-api-ng/api/api'
import {
  ConsultationSummaryExpertController,
  IConsultationSummaryExpertControllerScope
} from './consultation-summary-expert.controller'
import consultationSummaryExpertModule from './consultation-summary-expert'

describe('Testing Controller: consultationSummaryExpertController', () => {

  let expertConsultationDetails: ConsultationSummaryExpertController
  let scope: IConsultationSummaryExpertControllerScope
  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  beforeEach(() => {
    angular.mock.module(consultationSummaryExpertModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
  }))

  beforeEach(() => {
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$httpBackend_: ng.IHttpBackendService,
            _ViewsApi_: ViewsApi) => {

      scope = <IConsultationSummaryExpertControllerScope>$rootScope.$new()
      scope.serviceId = '123'

      expertConsultationDetails = $controller<ConsultationSummaryExpertController>('consultationSummaryExpertController', {
        $scope: scope,
        $uibModalInstance: $uibModalInstance,
        httpBackend: _$httpBackend_,
        ViewsApi: _ViewsApi_
      })
    })
  })

  it('should exists', () => {
    return expect(!!expertConsultationDetails).toBe(true)
  })

  it('should uibModalInstance', () => {
    expertConsultationDetails.onModalClose()
    expect($uibModalInstance.dismiss).toHaveBeenCalled()
  })

})
