describe('Unit testing: profitelo.components.interface.preloader', () => {
  return describe('for preloader component >', () => {

    const url = 'awesomUrl/'

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<preloader data-is-loading= "true"></preloader>'
    let _timeout = null
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
      module('profitelo.components.interface.preloader')

      inject(($rootScope, $compile, _$componentController_, $timeout) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        _timeout = $timeout
      })

      component = componentController('preloader', {$element: create(validHTML), $scope: scope}, {})

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