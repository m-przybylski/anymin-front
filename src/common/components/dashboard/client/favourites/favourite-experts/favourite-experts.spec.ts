describe('Unit testing: profitelo.components.dashboard.client.favourites.favourite-experts', () => {
  return describe('for clientFavouriteExperts >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<client-favourite-experts></client-favourite-experts>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.dashboard.client.favourites.favourite-experts')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('clientFavouriteExperts', {})
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
