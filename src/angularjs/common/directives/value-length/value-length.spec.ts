import * as angular from 'angular'
import {IRootScopeService} from '../../services/root-scope/root-scope.service';
import valueLength from './value-length'

describe('Unit testing: profitelo.directives.value-length', () =>
  describe('for value-length directive >', () => {

    let compile: ng.ICompileService
    let scope: ng.IScope
    const validHTML = '<value-length></value-length>'

    beforeEach(() => {
      angular.mock.module(valueLength)

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(validHTML: string): JQuery {
      const elem = angular.element(validHTML)
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
)
