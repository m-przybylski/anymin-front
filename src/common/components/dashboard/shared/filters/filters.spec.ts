import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import IScope = angular.IScope
import {FinancialOperation} from 'profitelo-api-ng/model/models'
import {DashboardActivitiesService} from '../../../../services/dashboard-activites/dashboard-activities.service'
import dashboardFiltersModule from './filters'
import dashboardActivitiesModule from '../../../../services/dashboard-activites/dashboard-activites'

describe('Unit testing: profitelo.components.dashboard.activities.filters', () => {
  return describe('for dashboardFilters >', () => {

    let scope: IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: any
    const userService = {
      getUser: () => true
    }
    const filtersMock = {
      activityTypes: ['asas', 'asdasd', 'asdasd'],
      services: [{
        name: 'asdasd',
        id: 'asdasd',
        expertId: '23dd33f'
      }],
      experts: [{
        name: 'Halina',
        id: '23dd33f'
      }]
    }
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
    beforeEach(() => {
      angular.mock.module(dashboardFiltersModule)
      angular.mock.module(userService)
      angular.mock.module(dashboardActivitiesModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('userService', userService)
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(inject(($q: ng.IQService) => {
      spyOn(userService, 'getUser').and.callFake(() => $q.resolve({}))
    }))

    beforeEach(() => {
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
        userService: userService,
        dashboardActivitiesService: dashboardActivitiesService
      }
      const bindings = {
        filters: filtersMock,
        onSetSearchParams: () => true,
        accountType: FinancialOperation.AccountTypeEnum.PROFILE
      }

      component = componentController('dashboardFilters', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should update activity type param', inject(() => {
      spyOn(component, 'setupServicesList')
      component.updateActivityTypeParam({
        name: filtersMock.activityTypes[0],
        value: filtersMock.activityTypes[0]
      })
      expect(component.setupServicesList).toHaveBeenCalled()
    }))

    it('should update profile param by undefined', inject(() => {
      spyOn(component, 'setupServicesList')
      component.updateProfileParam({
        name: filtersMock.experts[0].name,
        value: void 0
      })
      expect(component.setupServicesList).toHaveBeenCalled()
    }))

    it('should update service param by main list', inject(() => {
      spyOn(component, 'onSetSearchParams')
      component.mainUpdateServiceParam({
        name: filtersMock.services[0].name,
        value: filtersMock.services[0].id
      })
      expect(component.onSetSearchParams).toHaveBeenCalled()
    }))

    it('should update service param by second list', inject(() => {
      spyOn(component, 'setupServicesList')
      component.secondUpdateServiceParam({
        name: filtersMock.services[0].name,
        value: filtersMock.services[0].id
      })
      expect(component.setupServicesList).toHaveBeenCalled()
    }))

  })
})
