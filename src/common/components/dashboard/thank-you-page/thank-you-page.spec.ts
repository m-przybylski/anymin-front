namespace profitelo.components.dashboard.thankYouPage {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.components.dashboard.charge-account.thank-you-page', () => {
    return describe('for thankYouPage component >', () => {

      let scope: any
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      let location: ng.ILocationService
      const validHTML = '<thank-you-page></thank-you-page>'

      function create(html: string): JQuery {
        scope = rootScope.$new()
        const elem = angular.element(html)
        const compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      beforeEach(() => {

        angular.mock.module('profitelo.components.dashboard.thank-you-page')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
                _$componentController_: ng.IComponentControllerService, _$location_: ng.ILocationService) => {
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
          location = _$location_
        })

        location.search = () => {
          return <any>{
            currency: 'PLN',
            amount: 12123
          }
        }

        component = componentController('thankYouPage', null)
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should create element', inject(() => {
        create(validHTML)
        expect(true).toBeTruthy()
      }))
    })
  })
}
