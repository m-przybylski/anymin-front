namespace profitelo.directives.expertProfile.proExpertSeeMore {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.pro-expert-see-more', () => {
    return describe('for pro-expert-see-more directive >', () => {

      let scope: any = null
      let rootScope: ng.IRootScopeService
      let compile: any = null
      let validHTML = '<pro-expert-see-more></pro-expert-see-more>'

      beforeEach(() => {
        //angular.mock.module('templates-module')
        angular.mock.module('profitelo.directives.pro-expert-see-more')

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
