import * as _ from 'lodash'
import {GetDashboardClientExperts} from 'profitelo-api-ng/model/models'

/* @ngInject */
export function DashboardClientFavouritesController(clientFavouritesConsultations: GetDashboardClientExperts) {
  this.balance = clientFavouritesConsultations.balance
  this.lastConsultations = _.sortBy(clientFavouritesConsultations.lastConsultations, 'createdAt')
  this.favouriteProfiles = clientFavouritesConsultations.favouriteProfiles

  return this
}
