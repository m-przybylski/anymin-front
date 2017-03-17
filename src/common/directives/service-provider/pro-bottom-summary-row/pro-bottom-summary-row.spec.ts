namespace profitelo.directives.serviceProvider.proBottomConsultationButton {
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.service-provider.pro-bottom-summary-row', function() {
  return describe('for proBottomSummaryRow directive >', function() {

    let compile: any = null
    let scope: any = null

    let validHTML = '<pro-bottom-summary-row data-width="vm.progressBarWidth" ' +
      'data-queue="vm.queue" data-button-action="saveAccountObject" data-order="8"></pro-bottom-summary-row>'

    beforeEach(function() {

    angular.mock.module('profitelo.directives.service-provider.pro-bottom-summary-row')

      inject(function($rootScope: IRootScopeService, $compile: ng.ICompileService) {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html: string) {
      let elem = angular.element(html)

      scope.saveAccountObject = () => {}

      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(function() {
      expect(true).toBeTruthy()
    }))

    it('compile the directive', function() {
      let el
      el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('call onClick', function() {
      let el
      el = create(validHTML)

      let isoScope = el.isolateScope()

      spyOn(isoScope, 'buttonAction')

      el.find('.button-next-step a').click()

      expect(isoScope.buttonAction).toHaveBeenCalled()
    })




  })
})
}
