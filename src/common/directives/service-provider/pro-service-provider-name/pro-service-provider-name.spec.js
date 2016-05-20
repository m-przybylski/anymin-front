describe('Unit testing: profitelo.directives.service-provider.pro-service-provider-name', function() {
  return describe('for proServiceProviderName directive >', function() {

    var compile = null
    var scope = null

    var validHTML = '<pro-service-provider-name data-queue="vm.queue" ' +
      'data-order="2" data-pro-model="vm.individualPathModel" ' +
       'data-placeholder="DASHBOARD.CONSULTATION_RANGE.CONSULTANTS_LIST_PLACEHOLDER"' +
      ' data-error-message="DASHBOARD.SERVICE_PROVIDER.NAME.BAD_NAME" tr-title="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT" ' +
      'tr-desc="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT_DESCRIPTION" required="required"></pro-service-provider-name>'

    beforeEach(function() {
      module('templates-module')
      module('profitelo.directives.service-provider.pro-service-provider-name')

      inject(function($rootScope, $compile) {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html) {
      var elem = angular.element(html)
      
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




  })
})
