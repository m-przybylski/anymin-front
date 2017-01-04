describe('Unit testing: profitelo.components.dashboard.client.activities.modals.consultation-details.complain', () => {
  return describe('for clientComplain >', () => {

    let rootScope
    let compile
    let componentController
    let component
    let parentComponent


    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-status')
    angular.mock.module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-reason')
    angular.mock.module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain')

      inject(($rootScope, $compile, _$componentController_) => {
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
