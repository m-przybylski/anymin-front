describe('Unit testing: profitelo.components.dashboard.client.favourite.favourite-experts.favourite-experts-list', () => {
  return describe('for clientFavouriteExpertsLists >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<client-favourite-expert></client-favourite-expert>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.dashboard.client.favourites.favourite-experts.favourite-expert')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('clientFavouriteExpert', {})
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
