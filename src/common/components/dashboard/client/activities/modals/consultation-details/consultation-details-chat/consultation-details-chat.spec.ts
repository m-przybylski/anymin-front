describe('Unit testing: profitelo.components.dashboard.client.activities.modals.consultation-details.consultation-details-chat', () => {
  return describe('for clientConsultationDetailsChat >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<client-consultation-details-chat></client-consultation-details-chat>'

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
    angular.mock.module('profitelo.components.dashboard.client.activities.modals.consultation-details.consultation-details-chat')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('clientConsultationDetailsChat', {})
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
