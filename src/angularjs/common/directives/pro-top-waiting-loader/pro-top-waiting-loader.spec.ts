import * as angular from 'angular'
import {TopWaitingLoaderService} from '../../services/top-waiting-loader/top-waiting-loader.service'

describe('Unit testing: profitelo.directives.pro-top-waiting-loader', () => {
  return describe('for proTopWaitingLoader >', () => {

    let scope: any = null
    let rootScope: ng.IRootScopeService
    let compile: any = null
    let topWaitingLoaderService: TopWaitingLoaderService
    const validHTML = '<pro-top-waiting-loader></pro-top-waiting-loader>'

    beforeEach(() => {
      angular.mock.module('profitelo.services.pro-top-waiting-loader-service')
      angular.mock.module('profitelo.directives.pro-top-waiting-loader')

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              _topWaitingLoaderService_: TopWaitingLoaderService) => {

        rootScope = $rootScope.$new()
        compile = $compile
        topWaitingLoaderService = _topWaitingLoaderService_
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
