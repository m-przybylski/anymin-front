import * as angular from 'angular'
import {IRootScopeService} from '../../services/root-scope/root-scope.service';

describe('Unit testing: profitelo.directives.ng-enter', () => {
  return describe('for ng-enter directive >', () => {

    let compile: any = null
    let scope: any = null
    const validHTML = '<input type="text" data-ng-enter="mockFunction()" />'

    beforeEach(() => {
      angular.mock.module('profitelo.directives.ng-enter')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(): JQuery {
      const elem = angular.element(validHTML)
      scope.mockFunction = (): void => {
      }
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

    it('should call the mock function on pressing enter', () => {

      const el = create()
      spyOn(scope, 'mockFunction').and.callThrough()
      const e = jQuery.Event('keypress')
      e.which = 13
      e.keyCode = 13
      el.trigger(e)

      expect(scope.mockFunction).toHaveBeenCalled()
    })

  })
})
