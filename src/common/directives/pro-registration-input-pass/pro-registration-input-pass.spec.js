describe('Unit testing: profitelo.directives.pro-registration-input-pass', () => {
  return describe('for pro-registration-input-pass directive >', () => {

    var compile   = null
    var scope     = null
    var validHTML = '<div data-pro-registration-input-pass></div>'


    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.pro-registration-input-pass')

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
      let el
      el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })


  })
})
