namespace profitelo.components.dashboard.client.favourites.favouriteExperts {

  describe('Unit testing: profitelo.components.dashboard.client.favourites.favourite-experts', () => {
    return describe('for clientFavouriteExperts >', () => {

      let scope: any
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      const validHTML = '<client-favourite-experts></client-favourite-experts>'

      function create(html: string): JQuery {
        scope = rootScope.$new()
        const elem = angular.element(html)
        const compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      beforeEach(() => {

        angular.mock.module('profitelo.components.dashboard.client.favourites.favourite-experts')

        inject(($rootScope: any, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
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
        const el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })
    })
  })
}
