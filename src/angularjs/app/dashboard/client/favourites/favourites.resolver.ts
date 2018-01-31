import { ViewsApi } from 'profitelo-api-ng/api/api';
import {
  GetDashboardClientExperts, GetFavouriteProfile, GetLastConsultation
} from 'profitelo-api-ng/model/models';

interface IAppClientFavouritesResolverResponse {
  favouriteProfiles: GetFavouriteProfile[];
  lastConsultations: GetLastConsultation[];
}

// tslint:disable:member-ordering
export class ClientFavouritesResolver {

  public static $inject = ['$q', 'ViewsApi'];

    constructor(private $q: ng.IQService, private ViewsApi: ViewsApi) {
  }

  public resolve = (): ng.IPromise<GetDashboardClientExperts> =>
    this.ViewsApi.getDashboardClientExpertsRoute()
      .then((res) => this.handleAppClientFavouritesResolverResponse(res), this.$q.reject)

  private handleAppClientFavouritesResolverResponse =
    (response: GetDashboardClientExperts): IAppClientFavouritesResolverResponse => ({
      favouriteProfiles: response.favouriteProfiles,
      lastConsultations: response.lastConsultations
    })

}
