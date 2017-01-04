describe('Unit testing: profitelo.components.dashboard.client.activities.modals.consultation-details.recommended-tags', () => {
  return describe('for clientRecommendedTags >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<client-recommended-tags selected-tags="selectedTags"></client-recommended-tags>'

    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    function create(html) {
      scope = rootScope.$new()
      scope.selectedTags = []
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.dashboard.client.activities.modals.consultation-details.recommended-tags')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      const injectors = {
        ServiceApi: _=>_
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
