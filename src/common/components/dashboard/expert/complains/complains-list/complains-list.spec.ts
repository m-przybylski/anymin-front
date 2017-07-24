import * as angular from 'angular'
import dashboardExpertComplainsListModule from './complains-list'
import {IDashboardExpertComplainsListBindings} from './complains-list'
import {DashboardExpertComplainsListComponentController} from './complains-list.controller'
describe('Unit testing: profitelo.common.dashboard.expert.complains.complains-list', () => {
  return describe('for complainsList component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: DashboardExpertComplainsListComponentController

    const validHTML = '<complains-list data-header-title="title"></complains-list>'

    const bindings = {
      headerTitle: 'title'
    }

    beforeEach(() => {
      angular.mock.module(dashboardExpertComplainsListModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    function create(html: string, bindings: IDashboardExpertComplainsListBindings): JQuery {
      const parentScope: ng.IScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module('pascalprecht.translate')

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope
        compile = $compile

        const injectors = {
        }

        component = $componentController<DashboardExpertComplainsListComponentController, IDashboardExpertComplainsListBindings>(
          'complainsList', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

  })
})
