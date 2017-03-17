namespace profitelo.components.dashboard.client.activities.clientActivities.filters {

  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  interface Window {
    Set: any;
  }

  declare let window: Window;

  describe('Unit testing: profitelo.components.dashboard.client.activities.filters', () => {
    return describe('for clientActivitiesFilters >', () => {

      let scope: any
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let validHTML = '<client-activities-filters data-filters="filters"></client-activities-filters>'
      let setOriginal: any
      let setMock: any

      const filters = {
        activityTypes: [],
        experts: [],
        services: []
      }

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeUrl/')

      }))

      beforeEach(() => {
        setOriginal = window.Set
        window.Set = () => setMock
      })

      function create(html: string) {
        scope = rootScope.$new()
        scope.filters = filters
        let elem = angular.element(html)
        let compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      beforeEach(() => {
        angular.mock.module('profitelo.filters.normalize-translation-key-filter')
        angular.mock.module('profitelo.services.client-activities-service')
        angular.mock.module('profitelo.components.dashboard.client.activities.client-activities.filters')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
        })
      })

      afterEach(() => {
        window.Set = setOriginal
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the component', () => {
        let el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })
    })
  })
}
