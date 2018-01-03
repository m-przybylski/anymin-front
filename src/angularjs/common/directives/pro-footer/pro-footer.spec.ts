import * as angular from 'angular'
import {IRootScopeService} from '../../services/root-scope/root-scope.service';

describe('Unit testing: profitelo.directives.pro-footer', () => {
  return describe('for pro-footer directive >', () => {

    let scope: any = null
    let rootScope: ng.IRootScopeService
    let compile: any = null
    const validHTML = '<pro-footer></pro-footer>'

    beforeEach(() => {

      angular.mock.module('profitelo.directives.pro-footer')
      angular.mock.module('commonConfig')

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
