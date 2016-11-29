describe('Unit testing: profitelo.components.interface.multiselect', () => {
  return describe('for multiselect >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<multiselect tags="tags" value="name" title="title"></multiselect>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.interface.multiselect')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('multiselect', {$element: create(validHTML), $scope: scope}, {})

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
