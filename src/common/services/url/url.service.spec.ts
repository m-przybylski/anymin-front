import * as angular from "angular"
import {UrlService} from "./url.service"

describe('Unit testing: profitelo.services.helper >', () => {
  describe('for urlService service >', () => {

    let urlService: UrlService

    beforeEach(() => {
      angular.mock.module('profitelo.services.url')

      inject(($injector: ng.auto.IInjectorService) => {
        urlService = $injector.get<UrlService>('urlService')
      })

    })

    it('should exist', () => {
      expect(true).toBeTruthy()
    })

    it('should have get function', () => {
      expect(urlService.resolveSocialUrl).toBeDefined()
    })

    it('should match social networks classes', () => {

      const generic = urlService.resolveSocialUrl('https://wykop.pl').iconClass
      const facebook = urlService.resolveSocialUrl('facebook.com/costam').iconClass
      const linkedIn = urlService.resolveSocialUrl('https://linkedin.com/ktostam').iconClass

      expect(facebook).toEqual('icon-facebook-24')
      expect(linkedIn).toEqual('icon-linkedin-24')
      expect(generic).toEqual('icon-www-24')
    })
  })
})
