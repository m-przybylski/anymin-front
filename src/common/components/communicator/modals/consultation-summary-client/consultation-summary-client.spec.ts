import * as angular from 'angular'
import {
  ConsultationSummaryClientController,
  IConsultationSummaryClientControllerScope, IConsultationSummaryClientParentControllerScope
} from './consultation-summary-client'

describe('Testing Controller: consultationSummaryClientController', () => {

  let consultationSummaryController: ConsultationSummaryClientController
  let scope: IConsultationSummaryClientControllerScope

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
  }))

  beforeEach(() => {
    angular.mock.module('profitelo.components.communicator.modals.consultation-summary-client')
    inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) => {

      scope = <IConsultationSummaryClientControllerScope>$rootScope.$new()
      scope.$parent = <IConsultationSummaryClientParentControllerScope>$rootScope.$new()

      const injectors = {
        $scope: scope,
        $uibModalInstance: $uibModalInstance,
        callSummaryService: {
          onCallSummary: (attr: string) => attr,
          takeCallSummary: (serviceId: string) => serviceId
        }
      }

      consultationSummaryController = $controller<ConsultationSummaryClientController>(
        'consultationSummaryClientController', injectors)
    })
  })

  it('should exists', () => {
    return expect(!!consultationSummaryController).toBe(true)
  })
})
