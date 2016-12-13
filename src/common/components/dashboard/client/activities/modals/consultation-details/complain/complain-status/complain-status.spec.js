describe('Unit testing: profitelo.components.dashboard.client.activities.modals.consultation-details.complain-status.complain', () => {
  return describe('for clientComplainStatus >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<client-complain-status></client-complain-status>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-status')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('clientComplainStatus', {})
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
