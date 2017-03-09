import * as angular from "angular"
import {UrlService} from "./url.service"

namespace profitelo.services.helper {
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

        var generic = urlService.resolveSocialUrl('https://wykop.pl').iconClass
        var facebook = urlService.resolveSocialUrl('facebook.com/costam').iconClass
        var linkedIn = urlService.resolveSocialUrl('https://linkedin.com/ktostam').iconClass

        expect(facebook).toEqual('icon-facebook-24')
        expect(linkedIn).toEqual('icon-linkedin-24')
        expect(generic).toEqual('icon-www-24')
      })
    })
  })


}
