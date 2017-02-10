namespace profitelo.services.searchUrl {
  describe('Unit testing: profitelo.services.search-url >', () => {
    describe('for searchUrlService service >', () => {

      let searchUrlService: ISearchUrlService

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', '')
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.services.search')
        angular.mock.module('profitelo.services.search-url')
        angular.mock.module('profitelo.swaggerResources.definitions')
        angular.mock.module('profitelo.services.categories')

        inject(($injector: ng.auto.IInjectorService) => {
          searchUrlService = $injector.get<ISearchUrlService>('searchUrlService')
        })

      })

      it('should exist', () => {
        expect(true).toBeTruthy()
      })

    })
  })
}
