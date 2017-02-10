namespace profitelo.components.interface.pinVerification {

  describe('Unit testing: profitelo.components.interface.pin-verification', () => {
    return describe('for pinVerification component >', () => {

      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let component: PinVerificationComponentController

      const validHTML =
        '<pin-verification></pin-verification>'

      const bindings = {
      }

      function create(html, bindings): JQuery {
        const parentScope = rootScope.$new()
        const parentBoundScope = angular.extend(parentScope, bindings)
        let elem = angular.element(html)
        let compiledElement = compile(elem)(parentBoundScope)
        parentBoundScope.$digest()
        return compiledElement
      }

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.components.interface.pin-verification')

        inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
                $componentController: ng.IComponentControllerService) => {

          rootScope = $rootScope.$new()
          compile = $compile

          const injectors = {}

          component = $componentController<PinVerificationComponentController, {}>(
            'pinVerification', injectors, bindings)
        })
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the component', () => {
        let el = create(validHTML, bindings)
        expect(el.html()).toBeDefined(true)
      })

    })
  })
}
