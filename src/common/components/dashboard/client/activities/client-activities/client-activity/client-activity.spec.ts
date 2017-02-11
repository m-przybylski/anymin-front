namespace profitelo.components.dashboard.client.activities.clientActivity {
import IModalsService = profitelo.services.modals.IModalsService
  describe('Unit testing: profitelo.components.dashboard.client.activities.client-activity', () => {
  return describe('for clientLastActivitiesList >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let validHTML = '<client-activity data-activity="activity"></client-activity>'
    const mockObject = {
      sueProfileServiceTuple: {
        profile: {
          expertDetails: {}
        }
      }
    }
    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      scope.activity = mockObject
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    let bindings: any = {
      activity: mockObject
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
    }))

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.services.url')
    angular.mock.module('profitelo.services.modals')
    angular.mock.module('profitelo.filters.money')
    angular.mock.module('profitelo.components.complaints.status')
    angular.mock.module('profitelo.components.dashboard.client.activities.client-activity')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _modalsService_: IModalsService) => {
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
})}
