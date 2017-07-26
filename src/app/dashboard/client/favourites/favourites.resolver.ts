import {ViewsApi} from 'profitelo-api-ng/api/api'
import {GetDashboardClientExperts, MoneyDto, GetFavouriteProfile, GetLastConsultation} from 'profitelo-api-ng/model/models'

interface IAppClientFavouritesResolverResponse {
  balance: MoneyDto,
  favouriteProfiles: GetFavouriteProfile[],
  lastConsultations: GetLastConsultation[]
}

export class ClientFavouritesResolver {

  /* @ngInject */
  constructor(private $q: ng.IQService, private ViewsApi: ViewsApi) {
  }

  public resolve = (): ng.IPromise<GetDashboardClientExperts> =>
    this.ViewsApi.getDashboardClientExpertsRoute()
      .then((res) =>
        this.handleAppClientFavouritesResolverResponse(res), this.handleAppClientFavouritesResolverResponseError)

  private handleAppClientFavouritesResolverResponseError = (error: any): ng.IPromise<void> =>
    this.$q.reject(error)

  private handleAppClientFavouritesResolverResponse = (response: GetDashboardClientExperts): IAppClientFavouritesResolverResponse =>
    ({
      balance: response.balance,
      favouriteProfiles: response.favouriteProfiles,
      lastConsultations: response.lastConsultations
    })

}
