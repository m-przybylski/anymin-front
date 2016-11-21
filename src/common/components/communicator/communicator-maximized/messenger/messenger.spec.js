describe('Unit testing: profitelo.components.communicator.communicator-maximized.messenger', () => {
  return describe('for messenger component >', () => {

    let scope
    let rootScope
    let compile
    let component
    const validHTML = '<messenger data-call-length="0" data-call-cost="0" data-is-messenger="false"></messenger>'
    const bindings = {
      callLength: 0,
      callCost: 0,
      isMessenger: false
    }

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('profitelo.services.sounds')
    })

    beforeEach(module(($provide) => {
      $provide.value('soundsService', {})
    }))

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.communicator.communicator-maximized.messenger')

      inject(($rootScope, $compile, _$componentController_) => {
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {}

        component = _$componentController_('messenger', injectors, bindings)
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

