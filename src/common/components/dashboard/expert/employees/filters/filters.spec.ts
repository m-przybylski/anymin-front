import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import expertEmployeesFiltersModule from './filters';
import IScope = angular.IScope;
import {ExpertEmployeesFiltersComponentController} from './filters.controller';

describe('Unit testing: profitelo.components.dashboard.expert.employees.filters.filters', () => {
  return describe('for expertFilters >', () => {

    let scope: IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: ExpertEmployeesFiltersComponentController
    const validHTML = '<expert-employees-filters></expert-employees-filters>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module(expertEmployeesFiltersModule)

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })
        component = componentController<ExpertEmployeesFiltersComponentController, {}>('expertEmployeesFilters', {}, {})

    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
