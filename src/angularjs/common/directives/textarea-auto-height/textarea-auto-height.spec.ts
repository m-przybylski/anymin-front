import * as angular from 'angular'
import {IRootScopeService} from '../../services/root-scope/root-scope.service';
import textareaAutoHeight from './textarea-auto-height'

describe('Unit testing: profitelo.directives.textarea-auto-height', () => {
  return describe('for textarea-auto-height directive >', () => {

    let compile: ng.ICompileService
    let scope: ng.IScope
    const validHTML = '<form textarea-auto-height><textarea></textarea></form>'

    beforeEach(() => {
      angular.mock.module(textareaAutoHeight)

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
})
