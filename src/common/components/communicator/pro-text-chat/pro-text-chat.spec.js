describe('Unit testing: profitelo.components.communicator.pro-text-chat', () => {
  return describe('for pro-text-chat component >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<pro-text-chat data-show-chat="true"></pro-text-chat>'

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.communicator.pro-text-chat')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('proTextChat', null, {})

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

    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should send a message ', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      isoScope.newMessage = 'THIS IS JUST DUMB MESSAGE'
      isoScope.sendMessage()
      expect(isoScope.messages.length > 1).toBe(true)
    })

  })
})