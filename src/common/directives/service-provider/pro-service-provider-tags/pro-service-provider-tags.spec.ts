namespace profitelo.directives.serviceProvider.proServiceProviderTags {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.service-provider.pro-service-provider-tags', function () {
    return describe('for proServiceProviderTags directive >', function () {

      let compile: ng.ICompileService
      let scope: any = null
      const _url = 'url'

      const validHTML = '<pro-service-provider-tags data-queue="vm.queue" ' +
        'data-order="2" data-pro-model="proModel" ' +
        'data-placeholder="DASHBOARD.CONSULTATION_RANGE.CONSULTANTS_LIST_PLACEHOLDER"' +
        ' data-error-message="DASHBOARD.SERVICE_PROVIDER.NAME.BAD_NAME" tr-title="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT" ' +
        'tr-desc="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT_DESCRIPTION" required="required"></pro-service-provider-tags>'

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', _url)
      }))

      beforeEach(() => {
        //angular.mock.module('templates-module')
        angular.mock.module('profitelo.directives.service-provider.pro-service-provider-tags')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
          scope = $rootScope.$new()
          compile = $compile
        })
      })

      function create(html: string) {
        const elem = angular.element(html)
        scope.proModel = {tags: []}
        const compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('compile the directive', () => {
        const el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })

    })
  })
}
