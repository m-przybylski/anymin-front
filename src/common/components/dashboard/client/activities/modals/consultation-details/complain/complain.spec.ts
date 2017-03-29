namespace profitelo.components.dashboard.client.activities.modals.consultationDetails.complain {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.components.dashboard.client.activities.modals.consultation-details.complain', () => {
    return describe('for clientComplain >', () => {

      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      let parentComponent

      beforeEach(() => {

        angular.mock.module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-status')
        angular.mock.module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-reason')
        angular.mock.module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
        })
        parentComponent = componentController('collapseBtn', {$element: {}})
        component = componentController('clientComplain', {})
        component.collapseBtn = parentComponent
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))
    })
  })
}
