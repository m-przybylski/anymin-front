namespace profitelo.directives.serviceProvider.proServiceProviderName {
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.service-provider.pro-service-provider-name', function() {
  return describe('for proServiceProviderName directive >', function() {

    var compile: any = null
    var scope: any = null

    var validHTML = '<pro-service-provider-name data-queue="vm.queue" ' +
      'data-order="2" data-pro-model="proModel" ' +
       'data-placeholder="DASHBOARD.CONSULTATION_RANGE.CONSULTANTS_LIST_PLACEHOLDER"' +
      ' data-error-message="DASHBOARD.SERVICE_PROVIDER.NAME.BAD_NAME" tr-title="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT" ' +
      'tr-desc="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT_DESCRIPTION" required="required"></pro-service-provider-name>'

    beforeEach(function() {
    //angular.mock.module('templates-module')
    angular.mock.module('profitelo.directives.service-provider.pro-service-provider-name')

      inject(function($rootScope: IRootScopeService, $compile: ng.ICompileService) {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html: string) {
      var elem = angular.element(html)
      scope.proModel = {name: null}
      var compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    let triggerKeyDown = function(element: JQuery, keyCode: number) {
      let e = angular.element.Event('keypress')
      e.which = keyCode
      element.trigger(e)
    }

    it('should have a dummy test', inject(function() {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', function() {
      var el
      el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should save section on enter key', function() {
      var el
      el = create(validHTML)
      let isoScope = el.isolateScope()
      isoScope.onEnter()
      isoScope.model.name = ''
      triggerKeyDown(el, 13)


    })

  })

})
}
