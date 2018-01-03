import * as angular from 'angular'
import './pro-page-title'
import {IRootScopeService} from '../../services/root-scope/root-scope.service';


describe('Unit testing: profitelo.directives.page-title', () => {
  return describe('for page-title directive >', () => {

    let compile: any = null
    let scope: any = null
    const validHTML = '<title data-page-title></title>'

    beforeEach(() => {
      angular.mock.module('profitelo.directives.page-title')

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

    it('should change title when state changes', () => {

      const el = create()

      const sampleState: any = {}

      sampleState.data = {
        pageTitle: 'page 1'
      }

      sampleState.data.__proto__ = {}

      sampleState.data.__proto__.__proto__ = {
        pageTitle: 'page 2'
      }

      scope.$emit('$stateChangeStart', sampleState)

      expect($(el).text()).toEqual('page 1 - page 2')

    })

    it('should handle bad input', () => {

      create()

      const sampleState = {
        pageTitle: 'page 1'
      }

      scope.$emit('$stateChangeStart', sampleState)
    })

  })
})
