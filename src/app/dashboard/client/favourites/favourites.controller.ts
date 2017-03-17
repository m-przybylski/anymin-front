import * as _ from 'lodash'
import {ISearchResultRow} from '../../../../common/services/search/search.service'
import {GetDashboardClientExperts} from 'profitelo-api-ng/model/models'
import {RecommendedServicesService} from '../../../../common/services/recommended-services/recommended-services.service'

/* @ngInject */
export function DashboardClientFavouritesController($log: ng.ILogService,
                                                    clientFavouritesConsultations: GetDashboardClientExperts,
                                                    recommendedServices: RecommendedServicesService) {
  this.balance = clientFavouritesConsultations.balance
  this.lastConsultations = _.sortBy(clientFavouritesConsultations.lastConsultations, 'createdAt')
  this.favouriteProfiles = clientFavouritesConsultations.favouriteProfiles

  const onGetRecommendedExperts = (recommendedExperts: Array<ISearchResultRow>) =>
    this.similarExperts = recommendedExperts

  const onGetRecommendedExpertsError = (err: any) =>
    $log.error(err)

  recommendedServices.getRecommendedExperts(this.lastConsultations || this.favouriteProfiles)
    .then(onGetRecommendedExperts, onGetRecommendedExpertsError)

  return this
}
