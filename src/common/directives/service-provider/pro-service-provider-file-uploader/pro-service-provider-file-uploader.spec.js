describe('Unit testing: profitelo.directives.service-provider.pro-service-provider-file-uploader', function() {
  return describe('for proServiceProviderName directive >', function() {

    var compile = null
    var scope = null

    let _url = 'awesomeUrl'

    var validHTML = '<pro-service-provider-file-uploader data-queue="vm.queue" ' +
      'data-order="2" data-pro-model="proModel" ' +
      'data-placeholder="DASHBOARD.CONSULTATION_RANGE.CONSULTANTS_LIST_PLACEHOLDER"' +
      ' data-error-message="DASHBOARD.SERVICE_PROVIDER.NAME.BAD_NAME" tr-title="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT" ' +
      'tr-desc="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT_DESCRIPTION" required="required"></pro-service-provider-file-uploader>'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(function() {
      module('templates-module')
      module('profitelo.directives.service-provider.pro-service-provider-file-uploader')

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

    // it('remove file', ()=> {
    //   let el = create(validHTML)
    //   let isoScope = el.isolateScope()
    //   spyOn(isoScope, 'removeFile').and.callThrough()
    //   scope.$digest()
    //   el.find('.icon-trash-24').click()
    //   scope.$digest()
    //   expect(isoScope.removeFile).toHaveBeenCalledWith(1)
    // })

  })
})
