import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {UrlService} from '../../services/url/url.service'
import {ISocialIconGetterLink} from './pro-social-icon-getter'

describe('Unit testing: profitelo.directives.pro-social-icon-getter', () => {
  return describe('for pro-social-icon-getter directive >', () => {

    let compile: ng.ICompileService
    let scope: ISocialIconGetterLink
    const validHTML = '<span pro-social-icon-getter url="url"></span>'

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('urlService', UrlService)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.directives.pro-social-icon-getter')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(): JQuery {
      const elem = angular.element(validHTML)
      const compiledElement = compile(elem)(scope)
      scope.url ='sdsdsdsd'
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
