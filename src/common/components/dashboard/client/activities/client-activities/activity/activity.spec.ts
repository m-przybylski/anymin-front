import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {ModalsService} from '../../../../../../services/modals/modals.service'
import modalsModule from '../../../../../../services/modals/modals'
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

    angular.mock.module('profitelo.services.url')
    angular.mock.module(modalsModule)
    angular.mock.module('profitelo.filters.money')
    angular.mock.module('profitelo.components.complaints.status')
    angular.mock.module('profitelo.components.dashboard.client.activities.client-activity')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _modalsService_: ModalsService) => {
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
