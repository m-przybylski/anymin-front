import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import IScope = angular.IScope
import {FinancialOperation} from 'profitelo-api-ng/model/models'
import {DashboardActivitiesService} from '../../../../services/dashboard-activites/dashboard-activities.service'
import dashboardFiltersModule from './filters'
import dashboardActivitiesModule from '../../../../services/dashboard-activites/dashboard-activites'

describe('Unit testing: profitelo.components.dashboard.expert.activities.filters', () => {
  return describe('for expertFilters >', () => {

    let scope: IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: any
    let dashboardActivitiesService: DashboardActivitiesService
    let validHTML = '<dashboard-filters filters="filters" account-type="accountType" ' +
      'on-set-search-params="onSetSearchParams"></dashboard-filters>'
    let injectors = {}
    function create(html: string) {
      scope = rootScope.$new()
      scope.filters = {
        activityTypes: ['asd'],
        services: [{
          name: 'asdasd',
          id: 'asdasdasdasd'
        }],
        experts: []
      }
      scope.accountType = FinancialOperation.AccountTypeEnum.PROFILE
      scope.onSetSearchParams = () => {}
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {

      angular.mock.module(dashboardFiltersModule)
      angular.mock.module(dashboardActivitiesModule)
      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService,
              _dashboardActivitiesService_: DashboardActivitiesService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        dashboardActivitiesService = _dashboardActivitiesService_
      })

      injectors = {
        $element: create(validHTML),
        dashboardActivitiesService: dashboardActivitiesService
      }
      const bindings = {
        filters: {
          activityTypes: ['asas', 'asdasd', 'asdasd'],
          services: [{
            name: 'asdasd',
            id: 'asdasdasdasd'
          }],
          experts: []
        },
        onSetSearchParam: () => {},
        accountType: FinancialOperation.AccountTypeEnum.PROFILE
      }

      component = componentController('dashboardFilters', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))


  })
})
