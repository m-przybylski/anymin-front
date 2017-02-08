describe('Unit testing: profitelo.directives.page-title', () => {
  return describe('for page-title directive >', () => {

    var compile: any   = null
    var scope: any     = null
    var validHTML = '<title data-page-title></title>'

    beforeEach(() => {
    angular.mock.module('profitelo.directives.page-title')

      inject(($rootScope, $compile) => {
        scope                 = $rootScope.$new()
        compile               = $compile
      })
    })

    function create() {
      var elem = angular.element(validHTML)
      var compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create()
      expect(el.html()).toBeDefined(true)
    })

    it('should change title when state changes', () => {

      let el = create()

      let sampleState: any = {}

      sampleState.data = {
        pageTitle: 'page 1'
      }

      sampleState.data.__proto__ = {}

      sampleState.data.__proto__.__proto__ = {
        pageTitle: 'page 2'
      }

      scope.$emit('$stateChangeStart', sampleState)

      expect($(el).text()).toEqual('page 1 - page 2')

    })


    it('should handle bad input', () => {

      create()

      let sampleState = {
        pageTitle: 'page 1'
      }

      scope.$emit('$stateChangeStart', sampleState)
    })

  })
})
