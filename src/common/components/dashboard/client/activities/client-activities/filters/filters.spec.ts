interface Window {
  Set: any;
}

declare var window: Window;

describe('Unit testing: profitelo.components.dashboard.client.activities.filters', () => {
  return describe('for clientActivitiesFilters >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let validHTML = '<client-activities-filters data-filters="filters"></client-activities-filters>'
    let setOriginal
    let setMock

    const filters = {
      activityTypes: [],
      experts: [],
      services: []
    }

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', 'awesomeUrl/')

    }))

    beforeEach(() => {
      setOriginal = window.Set
      window.Set = () => setMock
    })

    function create(html) {
      scope = rootScope.$new()
      scope.filters = filters
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('ngLodash')
    angular.mock.module('profitelo.filters.normalize-translation-key-filter')
    angular.mock.module('profitelo.services.client-activities-service')
    angular.mock.module('profitelo.components.dashboard.client.activities.client-activities.filters')

      inject(($rootScope, $compile, _$componentController_) => {
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
