namespace profitelo.components.communicator.modals.consultationSummaryExpert {

  import IRootScopeService = profitelo.services.rootScope.IRootScopeService

  describe('Testing Controller: consultationSummaryExpertController', () => {

    let consultationSummaryExpertController: ConsultationSummaryExpertController
    let scope: IConsultationSummaryExpertControllerScope

    const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
      jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

    beforeEach(() => {
      angular.mock.module('profitelo.components.communicator.modals.consultation-summary-expert')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

        scope = <IConsultationSummaryExpertControllerScope>$rootScope.$new()
        scope.$parent = <IConsultationSummaryExpertParentControllerScope>$rootScope.$new()

        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance
        }

        consultationSummaryExpertController = $controller<ConsultationSummaryExpertController>(
          'consultationSummaryExpertController', injectors)
      })
    })

    it('should exists', () => {
      return expect(!!consultationSummaryExpertController).toBe(true)
    })

  })
}
