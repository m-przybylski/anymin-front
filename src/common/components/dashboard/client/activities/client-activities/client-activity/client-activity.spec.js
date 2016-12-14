describe('Unit testing: profitelo.components.dashboard.client.activities.client-activity', () => {
  return describe('for clientLastActivitiesList >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    const activity = {
      sueProfileServiceTuple: {
        profile: {
          expertDetails: {

          }
        }
      }
    }
    let validHTML = '<client-activity data-activity="activity"></client-activity>'

    function create(html) {
      scope = rootScope.$new()
      scope.activity = activity
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.dashboard.client.activities.client-activity')
      module('profitelo.services.helper')
      module('profitelo.filters.money')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

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
