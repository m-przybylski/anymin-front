describe('Unit testing: profitelo.directive.proRegistration', function() {
  return describe('for proRegistration directive >', function() {

    var compile = null
    var scope = null

    var validHTML = '<div data-pro-registration="\'40\'"></div>'

    beforeEach(function() {
      module('templates-module')
      module('profitelo.directive.proRegistration')

      inject(function($rootScope, $compile, $state) {
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
