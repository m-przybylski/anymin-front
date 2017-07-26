namespace profitelo.components.expertProfile.socialLinks {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.components.expert-profile.social-links', () => {
    return describe('for socialLinks component >', () => {

      let scope: any
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      const validHTML = '<social-links data-links="test"></social-links>'

      function create(html: string): JQuery {
        scope = rootScope.$new()
        const elem = angular.element(html)
        const compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      beforeEach(() => {

        angular.mock.module('profitelo.components.expert-profile.social-links')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
          componentController = _$componentController_
          rootScope = $rootScope
          compile = $compile

          const injectors = {
            $element: create(validHTML),
            $scope: rootScope
          }

          const bindings = {
            links: 'test'
          }

          component = componentController('socialLinks', injectors, bindings)
        })
      })

      it('should have a dummy test', () => {
        expect(true).toBeTruthy()
      })

      it('should compile the component', () => {
        const el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })

    })
  })
}
