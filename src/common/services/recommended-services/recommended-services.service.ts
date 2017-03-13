import {Tag} from "../../api/model/Tag"
import {SearchResult} from "../../api/model/SearchResult"
import {SearchApi} from "../../api/api/SearchApi"
import {Service} from "../../models/Service"

interface ServiceWithTags {
  service: Service
  tags: Array<Tag>
}

export class RecommendedServicesService {

  /* @ngInject */
  constructor(private $q: ng.IQService, private $log: ng.ILogService, private lodash: _.LoDashStatic,
              private SearchApi: SearchApi) {
  }

  private _onFindRecommended = (recommendedProfiles: SearchResult, servicesWithTags: Array<ServiceWithTags>) => {
    const currentConsultation = this.lodash.find(
      recommendedProfiles.results, row => row.id === servicesWithTags[0].service.id)

    if (!!currentConsultation) {
      recommendedProfiles.results = this.lodash.remove(recommendedProfiles.results, (n: Service) => {
        // TODO Remove tags by service id and profile id
        return n.id !== servicesWithTags[0].service.id
      })
    }
    return recommendedProfiles.results
  }

  private _onFindRecommendedError = () => {
    this.$log.warn('Similar profiles not found')
    return this.$q.resolve([])
  }

  private _getTagId = (servicesWithTags: Array<ServiceWithTags>): string | null => {
    if (!!servicesWithTags && servicesWithTags.length > 0) {
      const tagsArray = servicesWithTags[0].tags
      if (tagsArray && tagsArray.length > 0) {
        return tagsArray[0].id
      }
      return null

    }
    return null
  }

  public getRecommendedCompanies = (servicesWithTags: Array<ServiceWithTags>) => {
    const tagId = this._getTagId(servicesWithTags)
    if (tagId) {
      return this.SearchApi.searchRoute(
        undefined, undefined, undefined, undefined, tagId, undefined,
        'ORG', undefined, undefined, undefined, undefined, undefined, undefined, 10
      ).then((response) =>
        this._onFindRecommended(response, servicesWithTags), this._onFindRecommendedError)

    } else {
      return this.$q.resolve([])
    }
  }

  public getRecommendedExperts = (servicesWithTags: Array<ServiceWithTags>) => {
    const tagId = this._getTagId(servicesWithTags)
    if (tagId) {
      return this.SearchApi.searchRoute(
        undefined, undefined, undefined, undefined, tagId, undefined, 'EXP', undefined, undefined, undefined,
        undefined, undefined, undefined, 10
      ).then((response) =>
        this._onFindRecommended(response, servicesWithTags), this._onFindRecommendedError)
    } else {
      return this.$q.resolve([])
    }
  }
}
