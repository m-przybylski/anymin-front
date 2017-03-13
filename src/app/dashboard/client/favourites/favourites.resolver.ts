import {GetDashboardClientExperts} from "../../../../common/api/model/GetDashboardClientExperts"
import {ViewsApi} from "../../../../common/api/api/ViewsApi"

export class ClientFavouritesResolver {

  /* @ngInject */
  constructor(private $q: ng.IQService, private ViewsApi: ViewsApi) {
  }

  public resolve = () =>
    this.ViewsApi.getDashboardClientExpertsRoute()
      .then((res) => this.handleAppClientFavouritesResolverResponse(res), this.handleAppClientFavouritesResolverResponseError)

  private handleAppClientFavouritesResolverResponseError = (error: any) =>
    this.$q.reject(error)

  private handleAppClientFavouritesResolverResponse = (response: GetDashboardClientExperts) =>
    ({
      balance: response.balance,
      favouriteProfiles: response.favouriteProfiles,
      lastConsultations: response.lastConsultations
    })

}
