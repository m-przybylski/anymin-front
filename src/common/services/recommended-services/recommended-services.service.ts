namespace profitelo.services.recommendedServices {

  export interface IRecommendedServicesService {
    getRecommendedExperts(services: Array<Service>): ng.IPromise<Array<Service>>
    getRecommendedCompanies(services: Array<Service>): ng.IPromise<Array<Service>>
  }

  class RecommendedServicesService implements IRecommendedServicesService {

    constructor(private $q: ng.IQService, private $log: ng.ILogService, private lodash: _.LoDashStatic,
                private SearchApi) {
    }

    private _onFindRecommended = (recommendedProfiles, services) => {
      const currentConsultation = this.lodash.find(
        recommendedProfiles.results, (o: Service) => o.id === services[0].service.id)

      if (!!currentConsultation) {
        recommendedProfiles.results = this.lodash.remove(recommendedProfiles.results, (n: Service) => {
          // TODO Remove tags by service id and profile id
          return n.id !== services[0].service.id
        })
      }
      return recommendedProfiles.results
    }

    private _onFindRecommendedError = () => {
      this.$log.warn('Similar profiles not found')
      return this.$q.resolve([])
    }

    private _getTagId = (services) => {
      if (!!services && services.length > 0) {
        const tagsArray = services[0].tags
        if (tagsArray && tagsArray.length > 0) {
          return tagsArray[0].id
        }
        return null

      }
      return null
    }

    public getRecommendedCompanies = (services) => {
      const tagId = this._getTagId(services)
      if (tagId) {
        return this.SearchApi.search({
          'tag.id': tagId,
          'profile.type': 'ORG',
          'limit': 10
        }).$promise.then((response) => this._onFindRecommended(response, services), this._onFindRecommendedError)

      } else {
        return this.$q.resolve([])
      }
    }

    public getRecommendedExperts = (services) => {
      const tagId = this._getTagId(services)
      if (tagId) {
        return this.SearchApi.search({
          'tag.id': tagId,
          'profile.type': 'EXP',
          'limit': 10
        }).$promise.then((response) => this._onFindRecommended(response, services), this._onFindRecommendedError)
      } else {
        return this.$q.resolve([])
      }
    }
  }

  angular.module('profitelo.services.recommended-services', [
    'profitelo.swaggerResources',
    'ngLodash',
    'c7s.ng.userAuth'
  ])
  .service('recommendedServices', RecommendedServicesService)
}