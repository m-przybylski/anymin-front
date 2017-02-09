namespace profitelo.directives.proTopWaitingLoader {
  import ITopWaitingLoaderService = profitelo.services.topWaitingLoader.ITopWaitingLoaderService
  describe('Unit testing: profitelo.directives.pro-top-waiting-loader', () => {
    return describe('for proTopWaitingLoader >', () => {

      let scope: any = null
      let rootScope: ng.IRootScopeService
      let compile: any = null
      let topWaitingLoaderService: ITopWaitingLoaderService
      let validHTML = '<pro-top-waiting-loader></pro-top-waiting-loader>'

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.services.pro-top-waiting-loader-service')
        angular.mock.module('profitelo.directives.pro-top-waiting-loader')

        inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
                _topWaitingLoaderService_: ITopWaitingLoaderService) => {

          rootScope = $rootScope.$new()
          compile = $compile
          topWaitingLoaderService = _topWaitingLoaderService_
        })
      })

      function create(html: string) {
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
}
