import * as angular from 'angular'

import {FinancialOperation} from 'profitelo-api-ng/model/models'
import {DashboardActivitiesService} from '../../../../services/dashboard-activites/dashboard-activities.service'
import dashboardFiltersModule from './filters'
import dashboardActivitiesModule from '../../../../services/dashboard-activites/dashboard-activites'
import {IDashboardFiltersComponentScope} from './filters.controller'

describe('Unit testing: profitelo.components.dashboard.activities.filters', () => {
  return describe('for dashboardFilters >', () => {

    let scope: IDashboardFiltersComponentScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: any
    const userService = {
      getUser: (): boolean => true
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
    const validHTML = '<dashboard-filters filters="filters" account-type="accountType" ' +
      'on-set-search-params="onSetSearchParams"></dashboard-filters>'
    let injectors = {}
    function create(html: string): JQuery {
      scope = <IDashboardFiltersComponentScope>rootScope.$new()
      scope.filters = {
        activityTypes: ['asd'],
        services: [{
          name: 'asdasd',
          id: 'asdasdasdasd'
        }],
        experts: []
      }
      scope.accountType = FinancialOperation.AccountTypeEnum.PROFILE
      scope.onSetSearchParams = (): void => {}
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
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
      inject(($rootScope: any, $compile: ng.ICompileService,
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
        onSetSearchParams: (): boolean => true,
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

    it('should create dropdown services list', () => {
      component.filters.services = [{
        id: 'id',
        expertId: 'expertId',
        name: 'name'
      }]
      component.setupServicesList()
      expect(component.servicesDropdownList.length).toBe(1)
      expect(component.secondaryServicesDropdownList.length).toBe(0)
    })

    it('should group services', () => {
      const item = {
        name: 'name',
        value: 'someId'
      }
      component.filters.services = [{
        id: 'id',
        expertId: 'someId',
        name: 'name'
      }]
      component.updateProfileParam(item)
      expect(component.servicesDropdownList.length).toBe(1)
    })

    it('should not group services', () => {
      const item = {
        name: 'name',
        value: 'someId'
      }
      component.filters.services = [{
        id: 'id',
        expertId: 'expertId',
        name: 'name'
      }]
      component.updateProfileParam(item)
      expect(component.secondaryServicesDropdownList.length).toBe(1)
    })

  })
})
