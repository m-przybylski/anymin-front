describe('Unit testing: profitelo.components.communicator.communicator-maximized.navigation', () => {
  return describe('for communicatorNav component >', () => {

    let scope
    let rootScope
    let compile
    let component
    const validHTML = '<communicator-nav data-chat-minimize="ctrl.chatMinimize""></communicator-nav>'
    const bindings = {}

    beforeEach(() => {
      module('profitelo.services.sounds')
    })

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', 'awesomeUrl/')
      $provide.value('soundsService', {})
    }))

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.communicator.communicator-maximized.navigation')

      inject(($rootScope, $compile, _$componentController_, _callService_) => {
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          callService: _callService_
        }

        component = _$componentController_('communicatorNav', injectors, bindings)
      })
    })

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

  })
})
