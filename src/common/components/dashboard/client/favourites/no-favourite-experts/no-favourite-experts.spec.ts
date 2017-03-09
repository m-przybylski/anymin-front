namespace profitelo.components.dashboard.client.favourites.noFavouriteExperts {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.components.dashboard.client.favourites.no-favourite-experts', () => {
    return describe('for clientNoFavouriteExperts >', () => {

      let scope: any
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      let validHTML = '<no-favourite-experts></no-favourite-experts>'

      function create(html: string) {
        scope = rootScope.$new()
        let elem = angular.element(html)
        let compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      beforeEach(() => {
        //angular.mock.module('templates-module')
        angular.mock.module('profitelo.components.dashboard.client.favourites.no-favourite-experts')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
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
}
