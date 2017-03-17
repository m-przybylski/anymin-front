namespace profitelo.components.dashboard.client.activities.modals.consultationDetails.recommendedTags {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.components.dashboard.client.activities.modals.consultation-details.recommended-tags', () => {
    return describe('for clientRecommendedTags >', () => {

      let scope: any
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      let validHTML = '<client-recommended-tags selected-tags="selectedTags"></client-recommended-tags>'

      beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
        $provide.value('apiUrl', 'awesomeURL')
      }))

      function create(html: string) {
        scope = rootScope.$new()
        scope.selectedTags = []
        let elem = angular.element(html)
        let compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      beforeEach(() => {

        angular.mock.module('profitelo.components.dashboard.client.activities.modals.consultation-details.recommended-tags')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
        })

        const injectors = {
          ServiceApi: () => {
          }
        }

        const bindings = {
          selectedTags: [],
          isRecommended: false,
          serviceUsageEventId: 'asdasdasdasd',
          service: {},
          userTags: null
        }

        component = componentController('clientRecommendedTags', injectors, bindings)
      })

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
