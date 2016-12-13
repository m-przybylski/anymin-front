describe('Unit testing: profitelo.components.dashboard.client.activities.modals.consultation-details.conversation-rate', () => {
  return describe('for clientConversationRate >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<client-conversation-rate></client-conversation-rate>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.dashboard.client.activities.modals.consultation-details.conversation-rate')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('clientConversationRate', {})
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
