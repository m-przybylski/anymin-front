namespace profitelo.directives.serviceProvider.proServiceProviderWhoProvides {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.service-provider.pro-service-provider-who-provides', function () {
    return describe('for proServiceProviderWhoProvides directive >', function () {

      var compile: ng.ICompileService
      var scope: any = null

      var validHTML = '<pro-service-provider-who-provides data-queue="vm.queue" ' +
        'data-order="2" data-pro-model="proModel"' +
        'data-placeholder="DASHBOARD.CONSULTATION_RANGE.CONSULTANTS_LIST_PLACEHOLDER"' +
        ' data-error-message="DASHBOARD.SERVICE_PROVIDER.NAME.BAD_NAME" tr-title="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT" ' +
        'tr-desc="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT_DESCRIPTION" required="required"></pro-service-provider-who-provides>'

      beforeEach(function () {
        //angular.mock.module('templates-module')
        angular.mock.module('profitelo.directives.service-provider.pro-service-provider-who-provides')

        inject(function ($rootScope: IRootScopeService, $compile: ng.ICompileService) {
          scope = $rootScope.$new()
          compile = $compile
        })
      })

      function create(html: string) {
        var elem = angular.element(html)
        scope.proModel = []
        var compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      it('should have a dummy test', inject(function () {
        expect(true).toBeTruthy()
      }))

      it('compile the directive', function () {
        var el
        el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })
    })
  })
}
