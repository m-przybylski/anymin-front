import * as angular from "angular"
import {SearchApiMock} from "../../api/api/SearchApi"
import {SearchResult} from "../../api/model/SearchResult"
namespace profitelo.services.recommendedServices {
  describe('Unit testing: profitelo.services.recommended-profiles-service', () => {
    describe('for expert-profile service >', () => {

      let recommendedServices: any
      let url = 'awesomeURL'
      let _timeout: ng.ITimeoutService
      let SearchApiMock: SearchApiMock
      let $httpBackend: ng.IHttpBackendService
      let log
      let services: any

      beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
        $provide.value('apiUrl', url)
      }))

      beforeEach(() => {

        angular.mock.module('profitelo.services.recommended-services')

        inject(($injector: ng.auto.IInjectorService) => {
          recommendedServices = $injector.get('recommendedServices')
          _timeout = $injector.get('$timeout')
          SearchApiMock = $injector.get<SearchApiMock>('SearchApiMock')
          $httpBackend = $injector.get('$httpBackend')
          log = $injector.get('$log')
        })

        services = [
          {
            service: {
              id: 'sdsdsdsdsd'
            },
            tags: [
              {
                id: '12312'
              }, {
                id: '23232323'
              }]
          }
        ]
      })

      it('should have getRecommendedExperts function', () => {
        expect(recommendedServices.getRecommendedExperts).toBeDefined()
        expect(recommendedServices.getRecommendedCompanies).toBeDefined()
      })

      it('should return similarExperts', () => {
        const searchRespond = {
          results: [{
            id: '11231'
          }]
        }

        //FIXME type mapping
        SearchApiMock.searchRoute(200, undefined, undefined, undefined, undefined, '12312', undefined, 'EXP', undefined,
          undefined, undefined, undefined, undefined, undefined, 10, <SearchResult>searchRespond)

        const similarExperts = recommendedServices.getRecommendedExperts(services)
        $httpBackend.flush()
        expect(similarExperts.$$state.value).toEqual([Object({id: '11231'})])
      })

      it('should return empty array on similar experts', () => {
        //FIXME type mapping
        SearchApiMock.searchRoute(200, undefined, undefined, undefined, undefined, '12312', undefined, 'EXP', undefined,
          undefined, undefined, undefined, undefined, undefined, 10)

        const similarExperts = recommendedServices.getRecommendedExperts(services)
        $httpBackend.flush()
        expect(similarExperts.$$state.value).toEqual([])
      })

      it('should return similar companies', () => {
        const searchRespond = {
          results: [{
            id: '11231'
          }]
        }

        //FIXME type mapping
        SearchApiMock.searchRoute(200, undefined, undefined, undefined, undefined, '12312', undefined, 'ORG', undefined,
          undefined, undefined, undefined, undefined, undefined, 10, <SearchResult>searchRespond)

        const similarCompanies = recommendedServices.getRecommendedCompanies(services)
        $httpBackend.flush()
        expect(similarCompanies.$$state.value).toEqual([Object({id: '11231'})])
      })

      it('should return empty array on similar companies ', () => {

        SearchApiMock.searchRoute(500, undefined, undefined, undefined, undefined, '12312', undefined, 'ORG', undefined,
          undefined, undefined, undefined, undefined, undefined, 10)

        const similarCompanies = recommendedServices.getRecommendedCompanies(services)
        $httpBackend.flush()
        expect(similarCompanies.$$state.value).toEqual([])
      })

    })
  })
}
