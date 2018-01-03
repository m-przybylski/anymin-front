import {IRootScopeService} from '../../../services/root-scope/root-scope.service';
import * as angular from 'angular'

describe('Unit testing: profitelo.directives.pro-expert-card', () => {
  return describe('for pro-expert-card directive >', () => {

    let scope: any = null
    let rootScope: ng.IScope
    let compile: any = null
    const validHTML = '<pro-expert-card></pro-expert-card>'

    beforeEach(() => {

      angular.mock.module('profitelo.directives.pro-expert-card')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
        rootScope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
