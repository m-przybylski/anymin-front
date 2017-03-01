namespace profitelo.components.communicator.messenger.minimized {

  describe('Unit testing: profitelo.components.communicator.messenger.minimized', () => {
    return describe('for messengerMinimized component >', () => {

      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let component: MessengerMinimizedComponentController

      const validHTML = '<minimized></minimized>'

      const bindings: IMessengerMinimizedComponentBindings = {
        onMessageClick: () => {
        }
      }

      const messengerService = {
        onClientMessage: () => {},
        onExpertMessage: () => {},
        onChatLeft: () => {}
      }

      beforeEach(() => {
        angular.mock.module('profitelo.services.messenger')
      })

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeURL')
        $provide.value('messengerService', messengerService)
      }))

      function create(html: string, bindings: IMessengerMinimizedComponentBindings): JQuery {
        const parentScope: ng.IScope = rootScope.$new()
        const parentBoundScope = angular.extend(parentScope, bindings)
        let elem = angular.element(html)
        let compiledElement = compile(elem)(parentBoundScope)
        parentBoundScope.$digest()
        return compiledElement
      }

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.components.communicator.messenger.minimized')

        inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService, $timeout: ng.ITimeoutService,
                $componentController: ng.IComponentControllerService) => {

          rootScope = $rootScope
          compile = $compile

          const injectors = {
            $$timeout: $timeout,
            messengerService: messengerService
          }

          component = $componentController<MessengerMinimizedComponentController, IMessengerMinimizedComponentBindings>(
            'messengerMinimized', injectors, bindings)
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
