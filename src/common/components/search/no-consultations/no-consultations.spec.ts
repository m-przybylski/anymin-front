import * as angular from 'angular'
import './no-consultations'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
describe('Unit testing: profitelo.components.search.no-consultations', () => {
  return describe('for noConsultations component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let bindings: any
    let scope: any
    const validHTML = '<no-consultations></no-cosultaitons>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module('profitelo.components.search.no-consultations')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      bindings = {
        query: 'query'
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope
      }

      component = componentController('noConsultations', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

  })
})
