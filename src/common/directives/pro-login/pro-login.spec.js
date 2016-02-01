describe('Unit testing: profitelo.directives.pro-login', () => {
  return describe('for pro-login directive >', () => {

    var compile       = null
    var scope         = null

    var validHTML = '<div data-pro-login></div>'




    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.pro-login')

      inject(($rootScope, $compile) => {
        scope                 = $rootScope.$new()
        compile               = $compile
      })

    })

    function create(html) {
      var elem = angular.element(html)
      var compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      var el
      el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })


  })
})
