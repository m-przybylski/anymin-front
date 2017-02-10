namespace profitelo.directives.serviceProvider.proBottomConsultationButton {
describe('Unit testing: profitelo.directives.service-provider.pro-bottom-summary-row', function() {
  return describe('for proBottomSummaryRow directive >', function() {

    var compile: any = null
    var scope: any = null

    var validHTML = '<pro-bottom-summary-row data-width="vm.progressBarWidth" ' +
      'data-queue="vm.queue" data-button-action="saveAccountObject" data-order="8"></pro-bottom-summary-row>'

    beforeEach(function() {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.directives.service-provider.pro-bottom-summary-row')

      inject(function($rootScope: IRootScopeService, $compile: ng.ICompileService) {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html: string) {
      var elem = angular.element(html)

      scope.saveAccountObject = () => {}

      var compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(function() {
      expect(true).toBeTruthy()
    }))

    it('compile the directive', function() {
      var el
      el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('call onClick', function() {
      var el
      el = create(validHTML)

      let isoScope = el.isolateScope()

      spyOn(isoScope, 'buttonAction')

      el.find('.button-next-step a').click()

      expect(isoScope.buttonAction).toHaveBeenCalled()
    })




  })
})
}
