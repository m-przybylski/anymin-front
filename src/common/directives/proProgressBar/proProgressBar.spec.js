describe('Unit testing: profitelo.directives.proProgressBar', function() {
  return describe('for expertProfile directive >', function() {

    var compile = null
    var scope = null

    var validHTML = '<div data-pro-progress-bar="\'40\'"></div>'
    var validHTMLEmpty = '<div data-pro-progress-bar=""></div>'

    beforeEach(function() {
      module('templates-module')
      module('profitelo.directives.proProgressBar')

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

    it('compile the directive without progress set', function() {
      var el
      el = create(validHTMLEmpty)
      expect(el.html()).toBeDefined(true)
    })



  })
})
