namespace profitelo.components.dashboard.client.activities.modals.consultationDetails {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.components.dashboard.client.activities.modals.consultation-details.consultation-details-chat', () => {
    return describe('for clientConsultationDetailsChat >', () => {

      let scope: any
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      const validHTML = '<client-consultation-details-chat></client-consultation-details-chat>'

      function create(html: string): JQuery {
        scope = rootScope.$new()
        const elem = angular.element(html)
        const compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      beforeEach(() => {

        angular.mock.module('profitelo.components.communicator.messenger.maximized.grouped-messages')
        angular.mock.module('profitelo.components.dashboard.client.activities.modals.consultation-details.consultation-details-chat')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
        })

        component = componentController('clientConsultationDetailsChat', {})
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the directive', () => {
        const el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })

    })
  })
}
