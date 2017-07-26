import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import noResultsInformationModule from './no-results-information'
import IScope = angular.IScope;

describe('Unit testing: profitelo.components.dashboard.no-results-information-message', () => {
  return describe('for noResultsInformation >', () => {

    let scope: IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: any
    const validHTML = '<no-results-information></no-results-information>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module(noResultsInformationModule)

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('noResultsInformation', {})
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
