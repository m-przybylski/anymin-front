describe('Unit testing: profitelo.directives.service-provider.pro-service-provider-tags', function() {
  return describe('for proServiceProviderTags directive >', function() {

    let compile = null
    let scope = null
    const _url = "url"

    const validHTML = '<pro-service-provider-tags data-queue="vm.queue" ' +
      'data-order="2" data-pro-model="proModel" ' +
      'data-placeholder="DASHBOARD.CONSULTATION_RANGE.CONSULTANTS_LIST_PLACEHOLDER"' +
      ' data-error-message="DASHBOARD.SERVICE_PROVIDER.NAME.BAD_NAME" tr-title="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT" ' +
      'tr-desc="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT_DESCRIPTION" required="required"></pro-service-provider-tags>'

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.service-provider.pro-service-provider-tags')
      module('profitelo.swaggerResources.definitions')

      inject(($rootScope, $compile, $injector) => {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html) {
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
