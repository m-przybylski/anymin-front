import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import errorImage from './error-img'

describe('Unit testing: profitelo.directives.error-image', () => {
  return describe('for error-image directive >', () => {

    let compile: ng.ICompileService
    let scope: ng.IScope
    const validHTML = '<img src="/assets/images/no-avatar.jpg" error-image="/assets/images/no-avatar.jpg">'


    beforeEach(() => {
      angular.mock.module(errorImage)
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
