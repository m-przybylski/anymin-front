describe('Unit testing: profitelo.components.dashboard.client.activities.last-activities-list', () => {
  return describe('for clientLastActivitiesList >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<client-last-activities-list></client-last-activities>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.dashboard.client.activities.last-activities.last-activities-list')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('clientLastActivitiesList', {})
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
