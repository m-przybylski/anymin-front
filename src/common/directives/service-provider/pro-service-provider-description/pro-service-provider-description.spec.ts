namespace profitelo.directives.serviceProvider.proServiceProviderDescription {
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.service-provider.pro-service-provider-description', function() {
  return describe('for proServiceProviderName directive >', function() {

    let compile: any = null
    let scope: any = null

    let validHTML = '<pro-service-provider-description data-queue="vm.queue" ' +
      'data-order="2" data-pro-model="proModel" ' +
      'data-placeholder="DASHBOARD.CONSULTATION_RANGE.CONSULTANTS_LIST_PLACEHOLDER"' +
      ' data-error-message="DASHBOARD.SERVICE_PROVIDER.NAME.BAD_NAME" tr-title="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT" ' +
      'tr-desc="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT_DESCRIPTION" required="required"></pro-service-provider-description>'

    beforeEach(function() {

    angular.mock.module('profitelo.directives.service-provider.pro-service-provider-description')

      inject(function($rootScope: IRootScopeService, $compile: ng.ICompileService) {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html: string) {
      let elem = angular.element(html)
      scope.proModel = {description: null}
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


  })
})
}
