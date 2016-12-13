describe('Unit testing: profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-reason', () => {
  return describe('for clientComplainReason >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<client-complain-reason></client-complain-reason>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    let bindings = {

    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.interface.radio-text')
      module('profitelo.services.modals')
      module('profitelo.components.interface.radio')
      module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-reason')

      inject(($rootScope, $compile, _$componentController_, _modalsService_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          modalsService: _modalsService_
        }

        component = componentController('clientComplainReason', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should have a dummy test', inject((modalsService) => {
      spyOn(modalsService, 'createClientComplainReportModal')
      component.showComplainReasonModal()

      expect(modalsService.createClientComplainReportModal).toHaveBeenCalled()

    }))


  })
})
