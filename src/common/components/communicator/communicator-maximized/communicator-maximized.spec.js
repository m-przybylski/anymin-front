describe('Unit testing: profitelo.components.communicator.communicator-maximized', () => {
  return describe('for communicatorMaximized component >', () => {

    let scope
    let rootScope
    let compile
    let component
    const validHTML = '<communicator-maximized></communicator-maximized>'
    const bindings = {
      minimizeCommunicator: _ => _
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
      module('profitelo.components.communicator.communicator-maximized')

      inject(($rootScope, $compile, $timeout, _$componentController_) => {
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          $element: create(validHTML)
        }

        component = _$componentController_('communicatorMaximized', injectors, bindings)
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

