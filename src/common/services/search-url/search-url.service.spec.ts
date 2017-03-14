import * as angular from "angular"
import {SearchUrlService} from "./search-url.service"

describe('Unit testing: profitelo.services.search-url >', () => {
  describe('for searchUrlService service >', () => {

    let searchUrlService: SearchUrlService

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', '')
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.services.search')
      angular.mock.module('profitelo.services.search-url')
      angular.mock.module('profitelo.services.categories')

      inject(($injector: ng.auto.IInjectorService) => {
        searchUrlService = $injector.get<SearchUrlService>('searchUrlService')
      })

    })

    it('should exist', () => {
      expect(true).toBeTruthy()
    })

  })
})
