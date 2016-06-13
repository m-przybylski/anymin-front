describe('Unit testing: profitelo.directives.service-provider.pro-top-title-row', function() {
  return describe('for proTopTitleRow directive >', function() {

    var compile = null
    var scope = null

    var validHTML = '<pro-top-title-row data-title="ASD"></pro-top-title-row>'

    beforeEach(function() {
      module('templates-module')
      module('profitelo.directives.service-provider.pro-top-title-row')

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