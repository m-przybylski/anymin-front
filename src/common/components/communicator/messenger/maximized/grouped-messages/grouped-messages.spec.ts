namespace profitelo.components.communicator.messenger.maximized.groupedMessages {

  describe('Unit testing: profitelo.components.communicator.messenger.maximized.grouped-messages', () => {
    return describe('for groupedMessages component >', () => {

      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let component: GroupedMessagesComponentController

      const validHTML =
        '<grouped-messages messages="messages" participant-avatar="participantAvatar"></grouped-messages>'

      const bindings: IGroupedMessagesComponentBindings = {
        messages: [{}],
        participantAvatar: 'asd'
      }

      function create(html, bindings: IGroupedMessagesComponentBindings): JQuery {
        const parentScope = rootScope.$new()
        const parentBoundScope = angular.extend(parentScope, bindings)
        let elem = angular.element(html)
        let compiledElement = compile(elem)(parentBoundScope)
        parentBoundScope.$digest()
        return compiledElement
      }

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.components.communicator.messenger.maximized.grouped-messages')

        inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
                $componentController: ng.IComponentControllerService) => {

          rootScope = $rootScope.$new()
          compile = $compile

          const injectors = {}

          component = $componentController<GroupedMessagesComponentController, IGroupedMessagesComponentBindings>(
            'groupedMessages', injectors, bindings)
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
