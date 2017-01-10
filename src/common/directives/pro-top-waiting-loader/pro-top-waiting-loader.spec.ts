describe('Unit testing: profitelo.directives.pro-top-waiting-loader', () => {
  return describe('for proTopWaitingLoader >', () => {

    let _placeholder = 'PLACEHOLDER'

    let scope = null
    let rootScope
    let compile = null
    let proTopWaitingLoaderService
    let validHTML = '<pro-top-waiting-loader></pro-top-waiting-loader>'

    beforeEach(() => {
      angular.mock.module('templates-module')
      angular.mock.module('profitelo.services.pro-top-waiting-loader-service')
      angular.mock.module('profitelo.directives.pro-top-waiting-loader')

      inject(($rootScope, $compile, _proTopWaitingLoaderService_) => {
        rootScope = $rootScope.$new()
        compile = $compile
        proTopWaitingLoaderService = _proTopWaitingLoaderService_
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

  })
})
