describe('Unit testing: profitelo.directives.service-provider.pro-bottom-consultation-button', function() {
  return describe('for proBottomConsultationButton directive >', function() {

    var compile = null
    var scope = null

    var validHTML = '<pro-bottom-consultation-button data-width="vm.progressBarWidth" ' +
      'data-queue="vm.queue" data-button-action="saveAccountObject" data-order="8"></pro-bottom-consultation-button>'

    beforeEach(function() {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.directives.service-provider.pro-bottom-consultation-button')

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

  })
})
