describe('Unit testing: profitelo.components.communicator', () => {
  return describe('for communicator component >', () => {

    let scope
    let rootScope
    let compile
    let component
    const validHTML = '<communicator></communicator>'
    const bindings = {}

    beforeEach(() => {
      module('profitelo.services.sounds')
    })

    beforeEach(module(($provide) => {
      $provide.value('soundsService', {})
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {
      module('templates-module')
      module('profitelo.services.call')
      module('profitelo.components.communicator')

      inject(($rootScope, $compile, _$componentController_, _callService_) => {
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          callService: _callService_
        }

        component = _$componentController_('communicator', injectors, bindings)
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
