describe('Unit testing: profitelo.components.dashboard.client.activities.client-activity', () => {
  return describe('for clientLastActivitiesList >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<client-activity data-activity="activity"></client-activity>'
    const mockObject = {
      sueProfileServiceTuple: {
        profile: {
          expertDetails: {}
        }
      }
    }
    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      scope.activity = mockObject
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    let bindings = {
      activity: mockObject
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.services.helper')
      module('profitelo.services.modals')
      module('profitelo.filters.money')
      module('profitelo.components.complaints.status')
      module('profitelo.components.dashboard.client.activities.client-activity')

      inject(($rootScope, $compile, _$componentController_, _modalsService_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          modalsService: _modalsService_
        }

        component = componentController('clientActivity', injectors, bindings)
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