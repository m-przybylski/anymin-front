describe('Unit testing: profitelo.directives.service-provider.pro-bottom-summary-row', function() {
  return describe('for proBottomSummaryRow directive >', function() {

    var compile = null
    var scope = null

    var validHTML = '<pro-bottom-summary-row data-width="vm.progressBarWidth" ' +
      'data-queue="vm.queue" data-button-action="saveAccountObject" data-order="8"></pro-bottom-summary-row>'

    beforeEach(function() {
      module('templates-module')
      module('profitelo.directives.service-provider.pro-bottom-summary-row')

      inject(function($rootScope, $compile) {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html) {
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
