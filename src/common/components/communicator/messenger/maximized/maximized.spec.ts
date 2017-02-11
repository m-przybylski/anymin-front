namespace profitelo.components.communicator.messenger.maximized {

  import Money = profitelo.models.Money
  import IUrlService = profitelo.services.helper.IUrlService
  import IMessengerService = profitelo.services.messenger.IMessengerService

  describe('Unit testing: profitelo.components.communicator.messenger.maximized', () => {
    return describe('for messengerMaximized component >', () => {

      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let component: MessengerMaximizedComponentController
      let validHTML =
        '<maximized call-length="callLength" call-cost="callCost" minimize-messenger="minimizeMessenger"></maximized>'

      const bindings: IMessengerMaximizedComponentBindings = {
        callCost: new Money(0, 'PLN'),
        callLength: 0,
        isMessenger: true,
        minimizeMessenger: () => {}
      }

      const uploaderFactory = {
        collectionTypes: {avatar: 'avatar'},
        getInstance: () => {}
      }

      function create(html: string, bindings: IMessengerMaximizedComponentBindings): JQuery {
        const parentScope: ng.IScope = rootScope.$new()
        const parentBoundScope = angular.extend(parentScope, bindings)
        let elem = angular.element(html)
        let compiledElement = compile(elem)(parentBoundScope)
        parentBoundScope.$digest()
        return compiledElement
      }

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeURL')
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.services.sounds')
        angular.mock.module('profitelo.services.uploader')
      })

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('soundsService', {})
        $provide.value('uploaderFactory', uploaderFactory)
      }))

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.services.url')
        angular.mock.module('profitelo.filters.seconds-to-datetime')
        angular.mock.module('profitelo.filters.money')
        angular.mock.module('ngLodash')
        angular.mock.module('profitelo.services.messenger')
        angular.mock.module('profitelo.components.communicator.messenger.maximized')

        inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
                $componentController: ng.IComponentControllerService, _urlService_: IUrlService,
                _messengerService_: IMessengerService, _lodash_: _.LoDashStatic) => {

          rootScope = $rootScope.$new()
          compile = $compile

          const injectors = {
            messengerService: _messengerService_,
            lodash: _lodash_,
            $element: create(validHTML, bindings),
            urlService: _urlService_
          }

          component = $componentController<MessengerMaximizedComponentController, IMessengerMaximizedComponentBindings>(
            'messengerMaximized', injectors, bindings)
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
