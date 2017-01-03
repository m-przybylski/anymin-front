describe('Unit testing: profitelo.components.communicator.messenger.messenger-maximized.grouped-messages', () => {
  return describe('for groupedMessages component >', () => {

    let scope
    let rootScope
    let compile
    let component
    const validHTML = '<grouped-messages data-messages="[]"></grouped-messages>'
    const bindings = {
      messages: []
    }

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.communicator.messenger.messenger-maximized.grouped-messages')

      inject(($rootScope, $compile, _$componentController_) => {
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {}

        component = _$componentController_('groupedMessages', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

  })
})

