describe('Unit testing: profitelo.components.dashboard.client.favourites.no-favourite-experts', () => {
  return describe('for clientNoFavouriteExperts >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<no-favourite-experts></no-favourite-experts>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.dashboard.client.favourites.no-favourite-experts')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('clientNoFavouriteExperts', {})
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
