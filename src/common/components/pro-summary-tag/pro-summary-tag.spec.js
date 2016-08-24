describe('Unit testing: profitelo.components.pro-summary-tag', () => {
  return describe('for pro-summary-tag component >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<pro-summary-tag tags="tags" title="title"></pro-summary-tag>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.pro-summary-tag')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('proSummaryTag', {$element: create(validHTML), $scope: scope}, {})

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
