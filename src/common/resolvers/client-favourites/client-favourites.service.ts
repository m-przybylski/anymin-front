namespace profitelo.resolvers.clientFavourites {

  import IViewsApi = profitelo.api.IViewsApi
  import GetDashboardClientExperts = profitelo.api.GetDashboardClientExperts

  export interface IClientFavouritesResolverService {
    resolve(): ng.IPromise<GetDashboardClientExperts>
  }

  class ClientFavouritesResolver implements IClientFavouritesResolverService {

    constructor(private $q: ng.IQService, private ViewsApi: IViewsApi) {

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

  angular.module('profitelo.resolvers.client-favourites', [
    'profitelo.api.ViewsApi',
    'c7s.ng.userAuth'
  ])
  .service('ClientFavouritesResolver', ClientFavouritesResolver)

}
