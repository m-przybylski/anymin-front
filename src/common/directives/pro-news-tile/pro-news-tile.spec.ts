namespace profitelo.directives.proNewsTile {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.pro-news-tile', () => {
    return describe('for pro-news-tile directive >', () => {

      let scope: any = null
      let rootScope: ng.IRootScopeService
      let compile: any = null
      let validHTML = '<pro-news-tile></pro-news-tile>'

      beforeEach(() => {

        angular.mock.module('profitelo.directives.pro-news-tile')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
          rootScope = $rootScope.$new()
          compile = $compile
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
