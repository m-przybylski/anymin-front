import {ViewsApi} from 'profitelo-api-ng/api/api'
import {GetDashboardClientExperts} from 'profitelo-api-ng/model/models'

export class ClientFavouritesResolver {

  /* @ngInject */
  constructor(private $q: ng.IQService, private ViewsApi: ViewsApi) {
  }

  public resolve = () =>
    this.ViewsApi.getDashboardClientExpertsRoute()
      .then((res) =>
        this.handleAppClientFavouritesResolverResponse(res), this.handleAppClientFavouritesResolverResponseError)

  private handleAppClientFavouritesResolverResponseError = (error: any) =>
    this.$q.reject(error)

  private handleAppClientFavouritesResolverResponse = (response: GetDashboardClientExperts) =>
    ({
      balance: response.balance,
      favouriteProfiles: response.favouriteProfiles,
      lastConsultations: response.lastConsultations
    })

}
