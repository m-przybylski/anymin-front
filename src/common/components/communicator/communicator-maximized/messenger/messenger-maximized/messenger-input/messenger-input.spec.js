describe('Unit testing: profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized.messenger-input', () => {
  return describe('for messengerInput component >', () => {

    let scope
    let rootScope
    let compile
    let component
    const validHTML = '<messenger-input></messenger-input>'
    const bindings = {}

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized.messenger-input')

      inject(($rootScope, $compile, _$componentController_) => {
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {}

        component = _$componentController_('messengerInput', injectors, bindings)
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

