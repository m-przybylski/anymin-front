namespace profitelo.resolvers.clientFavourites {

  import Money = profitelo.models.Money

  export interface IClientFavourites {
    balance: Money
    favouriteProfiles: Array<Profile>
    lastConsultations: Array<Service>
  }

  export interface IClientFavouritesResolverService {
    resolve(): ng.IPromise<IClientFavourites>
  }

  class ClientFavouritesResolver implements IClientFavouritesResolverService {

    constructor(private $q: ng.IQService, private ViewsApi) {

    }

    public resolve = () =>
      this.ViewsApi.getDashboardClientExperts().$promise
      .then(this.handleAppClientFavouritesResolverResponse, this.handleAppClientFavouritesResolverResponseError)

    private handleAppClientFavouritesResolverResponseError = (error) =>
      this.$q.reject(error)

    private handleAppClientFavouritesResolverResponse = (response) =>
      ({
        balance: response.balance,
        favouriteProfiles: response.favouriteProfiles,
        lastConsultations: response.lastConsultations
      })

  }

  angular.module('profitelo.resolvers.client-favourites', [
    'profitelo.swaggerResources',
    'c7s.ng.userAuth'
  ])
  .service('ClientFavouritesResolver', ClientFavouritesResolver)

}
