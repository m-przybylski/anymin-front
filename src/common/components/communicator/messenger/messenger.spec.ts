namespace profitelo.components.communicator.messenger {

  import MoneyDto = profitelo.api.MoneyDto

  describe('Unit testing: profitelo.components.communicator.messenger', () => {
    return describe('for messenger component >', () => {

      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let component: MessengerComponentController

      const validHTML =
        '<messenger call-length="callLength" call-cost="callCost" is-messenger="isMessenger"></messenger>'

      const bindings: IMessengerComponentBindings = {
        callLength: 0,
        callCost: <MoneyDto>{amount: 0, currency: 'PLN'},
        isMessenger: false
      }

      function create(html: string, bindings: IMessengerComponentBindings) {
        const parentScope = rootScope.$new()
        const parentBoundScope = angular.extend(parentScope, bindings)
        const elem = angular.element(html)
        const compiledElement = compile(elem)(parentBoundScope)
        parentBoundScope.$digest()
        return compiledElement
      }

      beforeEach(() => {
        angular.mock.module('profitelo.services.sounds')
      })

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('soundsService', {})
        $provide.value('apiUrl', 'awesomeUrl/')
      }))

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.components.communicator.messenger')

        inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
                $componentController: ng.IComponentControllerService) => {

          rootScope = $rootScope
          compile = $compile

          const injectors = {
          }

          component = $componentController<MessengerComponentController, IMessengerComponentBindings>(
            'messenger', injectors, bindings)
        })
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the component', () => {
        let el = create(validHTML, bindings)
        expect(el.html()).toBeDefined(true)
      })

      it('should minimizeMessenger', () => {
        component.minimizeMessenger()
        expect(component.isMessenger).toBe(false)
      })

      it('should maximizeMessenger', () => {
        component.maximizeMessenger()
        expect(component.isMessenger).toBe(true)
      })
    })
  })
}
