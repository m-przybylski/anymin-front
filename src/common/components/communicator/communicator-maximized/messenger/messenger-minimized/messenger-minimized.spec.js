describe('Unit testing: profitelo.components.communicator.communicator-maximized.messenger.messenger-minimized', () => {
  return describe('for messengerMinimized component >', () => {

    const url = 'awesomeURL'
    let scope
    let $rootScope
    let $compile
    let $componentController
    let component
    let injectors
    let validHTML = '<messenger-minimized></messenger-minimized>'
    let bindings = {}

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', url)
    }))

    function create(html) {
      scope = $rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = $compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.services.messenger')
      module('profitelo.components.communicator.communicator-maximized.messenger.messenger-minimized')

      inject((_$rootScope_, _$compile_, _$timeout_, _$componentController_, _messengerService_) => {
        $componentController = _$componentController_
        $rootScope = _$rootScope_
        $compile = _$compile_

        injectors = {
          $timeout: _$timeout_,
          messengerService: _messengerService_
        }
      })

      component = $componentController('messengerMinimized', injectors, bindings)
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

