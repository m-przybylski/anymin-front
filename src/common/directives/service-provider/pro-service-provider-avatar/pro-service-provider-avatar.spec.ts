describe('Unit testing: profitelo.directives.service-provider.pro-service-provider-avatar', function() {
  return describe('for proServiceProviderAvatar directive >', function() {

    var compile: any = null
    var scope: any = null

    let _url = 'awesomeUrl'

    var validHTML = '<pro-service-provider-avatar data-queue="vm.queue" ' +
      'data-order="2" data-pro-model="proModel" ' +
      'data-placeholder="DASHBOARD.CONSULTATION_RANGE.CONSULTANTS_LIST_PLACEHOLDER"' +
      ' data-error-message="DASHBOARD.SERVICE_PROVIDER.NAME.BAD_NAME" tr-title="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT" ' +
      'tr-desc="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT_DESCRIPTION" required="required"></pro-service-provider-avatar>'

    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(function() {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.directives.service-provider.pro-service-provider-avatar')

      inject(function($rootScope, $compile) {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html) {
      var elem = angular.element(html)
      scope.proModel = {file: []}
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
