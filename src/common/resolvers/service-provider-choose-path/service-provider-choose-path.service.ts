namespace profitelo.resolvers.serviceProviderChoosePath {

  import IQService = angular.IQService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import Profile = profitelo.models.Profile

  export interface IServiceProviderChoosePathService {
    resolve(): ng.IPromise<Profile | null>
  }

  class ServiceProviderChoosePathResolver implements IServiceProviderChoosePathService {

    constructor(private $state: ng.ui.IStateService, private $q: IQService, private topAlertService: ITopAlertService,
                private User: any, private ProfileApi: any, private $log: ng.ILogService) {

    }

    public resolve = () => {
      let _deferred = this.$q.defer<Profile | null>()

      this.User.getStatus().then(() => {
        this.ProfileApi.getProfile({
          profileId: this.User.getData('id')
        }).$promise.then((response: Profile) => {
          if (!!response.expertDetails && !response.organizationDetails) {
            this.$state.go('app.dashboard.service-provider.individual-path')
          } else if (response.organizationDetails) {
            this.$state.go('app.dashboard.service-provider.company-path')
          } else {
            this.$state.go('app.dashboard.service-provider.company-path')
            // TODO when wizard is done
            // $state.go('app.dashboard.client.favourites')
          }
          _deferred.resolve(response)
        }, () => {
          _deferred.resolve(null)
        })
      }, (error: any) => {
        this.$log.error(error)
        this.$state.go('app.dashboard')
        this.topAlertService.error({
          message: 'error',
          timeout: 4
        })
      })

      return _deferred.promise
    }

  }

  angular.module('profitelo.resolvers.service-provider-choose-path', [
    'profitelo.swaggerResources',
    'profitelo.services.top-alert',
    'c7s.ng.userAuth',
    'profitelo.services.login-state'
  ])
  .service('ServiceProviderChoosePathResolver', ServiceProviderChoosePathResolver)

}
