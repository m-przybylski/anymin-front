describe('Unit testing: profitelo.directives.interface.scrollable', () => {
  return describe('for profitelo.directives.scrollable directive >', () => {

    let scope: any = null
    let rootScope
    let compile: any = null
    let timeout
    let interval
    let window
    let styleConstant
    let validHTML = '<scrollable></scrollable>'

    beforeEach(() => {
      angular.mock.module('templates-module')
      angular.mock.module('profitelo.constants.style')
      angular.mock.module('profitelo.directives.interface.scrollable')

      inject(($rootScope, $compile, _$timeout_, _$interval_, _$window_, _styleConstant_) => {
        rootScope = $rootScope.$new()
        compile = $compile
        timeout = _$timeout_
        window = _$window_
        interval = _$interval_
        styleConstant = _styleConstant_
      })

    })

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should timeout', inject(() => {
      create(validHTML)
      timeout.flush()
    }))

    it('should timeout', inject(() => {
      create(validHTML)
      timeout.flush()
    }))

    it('should assignNewHeightConainer', inject(() => {
      create(validHTML)
    }))
  })
})
