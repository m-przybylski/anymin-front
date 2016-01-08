describe('Unit testing: profitelo.directives.pro-progress-bar', function() {
  return describe('for expertProfile directive >', function() {

    var compile = null
    var scope = null

    var validHTML = '<div data-pro-progress-bar="progress" data-caption="caption"></div>'
    var validHTMLEmpty = '<div data-pro-progress-bar=""  data-caption="caption"></div>'

    beforeEach(function() {
      module('templates-module')
      module('profitelo.directives.pro-progress-bar')

      inject(function($rootScope, $compile) {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html) {
      var elem = angular.element(html)

      scope.caption   = "TRANSLATE.STRING"
      scope.progress  = 40

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
