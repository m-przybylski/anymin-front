describe('Unit testing: profitelo.components.interface.show-more-text', () => {
  return describe('for showMoreText component >', () => {

    const url = 'awesomUrl/'

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<show-more-text data-text=""></show-more-text>'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.interface.show-more-text')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('showMoreText', {$element: create(validHTML), $scope: scope}, {})

    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
