describe('Unit testing: profitelo.components.search.no-consultations', () => {
  return describe('for noConsultations component >', () => {

    let rootScope
    let compile
    let componentController
    let component
    let bindings
    let scope
    let validHTML = '<no-consultations></no-cosultaitons>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module('templates-module')
      angular.mock.module('profitelo.components.search.no-consultations')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      bindings = {
        query: 'query'
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope
      }

      component = componentController('noConsultations', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

  })
})

