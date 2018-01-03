import focusNext from './focus-next'
import * as angular from 'angular'

import {keyboardCodes} from '../../../classes/keyboard'
import {IRootScopeService} from '../../../services/root-scope/root-scope.service';

describe('Unit testing: profitelo.directives.interface.focus-next', () => {
  return describe('for profitelo.directives.interface.focus-next directive >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    const validHTML = '<div><input focus-next><input focus-next></div>'

    beforeEach(() => {

      angular.mock.module(focusNext)

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

    it('should block input if user press comma', () => {
      const el = create(validHTML)
      const e = jQuery.Event('keydown')
      spyOn(e, 'preventDefault')
      e.which = keyboardCodes.comma
      e.keyCode = keyboardCodes.comma
      el.find('input').trigger(e)
      expect(e.preventDefault).toHaveBeenCalled()
    })
  })
})

