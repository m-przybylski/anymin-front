describe('Unit testing: profitelo.components.communicator.communicator-nav', () => {
  return describe('for communicatorNav component >', () => {

    const url = 'awesomUrl/'

    let scope
    let rootScope
    let compile
    let bindings
    let componentController
    let component
    let validHTML = '<communicator-nav data-chat-minimize="ctrl.chatMinimize""></communicator-nav>'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    bindings = {}

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.communicator.communicator-nav')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('communicatorNav', null, bindings)
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

    it('should call connectionDisconnect on click', () => {
      let el = create(validHTML)
      scope.ctrl = {
        chatMinimize: jasmine.createSpy('chatMinimize')
      }
      scope.$digest()
      el.find('.communicator-upper-nav a:first-child').triggerHandler('click')
      expect(scope.ctrl.chatMinimize).toHaveBeenCalled()
    })

  })
})
