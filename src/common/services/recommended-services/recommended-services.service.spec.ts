describe('Unit testing: profitelo.services.recommended-profiles-service', () => {
  describe('for expert-profile service >', () => {

    let recommendedServices
    let url = 'awesomeURL'
    let _timeout
    let resourcesExpectations
    let SearchApiDef
    let $httpBackend
    let log
    let services

    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

    angular.mock.module('profitelo.swaggerResources.definitions')
    angular.mock.module('profitelo.services.recommended-services')

      inject(($injector) => {
        recommendedServices = $injector.get('recommendedServices')
        _timeout = $injector.get('$timeout')
        SearchApiDef = $injector.get('SearchApiDef')
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
              id:'12312'
            }, {
              id: '23232323'
            }]
        }
      ]

      resourcesExpectations = {
        SearchApiDef: {
          searchExperts: $httpBackend.when(SearchApiDef.search.method, SearchApiDef.search.url +
            '?limit=10&profile.type=EXP&tag.id=12312'),
          searchOrganizations: $httpBackend.when(SearchApiDef.search.method, SearchApiDef.search.url +
            '?limit=10&profile.type=ORG&tag.id=12312')
        }
      }
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

      resourcesExpectations.SearchApiDef.searchExperts.respond(200, searchRespond)

      const similarExperts = recommendedServices.getRecommendedExperts(services)
      $httpBackend.flush()
      expect(similarExperts.$$state.value).toEqual([ Object({ id: '11231' }) ])
    })

    it('should return empty array on similar experts', () => {
      const searchRespond = {
        results: [{
          id: '11231'
        }]
      }

      resourcesExpectations.SearchApiDef.searchExperts.respond(500, searchRespond)

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

      resourcesExpectations.SearchApiDef.searchOrganizations.respond(200, searchRespond)

      const similarCompanies = recommendedServices.getRecommendedCompanies(services)
      $httpBackend.flush()
      expect(similarCompanies.$$state.value).toEqual([ Object({ id: '11231' }) ])
    })

    it('should return empty array on similar companies ', () => {
      const searchRespond = {
        results: [{
          id: '11231'
        }]
      }

      resourcesExpectations.SearchApiDef.searchOrganizations.respond(500, searchRespond)

      const similarCompanies = recommendedServices.getRecommendedCompanies(services)
      $httpBackend.flush()
      expect(similarCompanies.$$state.value).toEqual([ ])
    })

  })
})