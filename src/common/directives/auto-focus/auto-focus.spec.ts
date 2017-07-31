import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import autoFocus from './auto-focus'

describe('Unit testing: profitelo.directives.auto-focus', () => {
  return describe('for auto-focus directive >', () => {

    let compile: ng.ICompileService
    let scope: ng.IScope
    let validHTML = '<form auto-focus><input type="text" name="first"></form>'

    beforeEach(() => {
      angular.mock.module(autoFocus)

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create() {
      let elem = angular.element(validHTML)
      scope.mockFunction = () => {
      }
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create()
      expect(el.html()).toBeDefined(true)
    })
  })
})
