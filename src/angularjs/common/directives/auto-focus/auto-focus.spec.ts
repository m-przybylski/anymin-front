import * as angular from 'angular'

import autoFocus from './auto-focus'
import {IRootScopeService} from '../../services/root-scope/root-scope.service';

describe('Unit testing: profitelo.directives.auto-focus', () => {
  return describe('for auto-focus directive >', () => {

    let compile: ng.ICompileService
    let scope: ng.IScope
    const validHTML = '<form auto-focus><input type="text" name="first"></form>'

    beforeEach(() => {
      angular.mock.module(autoFocus)

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(): JQuery {
      const elem = angular.element(validHTML)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      const el = create()
      expect(el.html()).toBeDefined(true)
    })
  })
})
