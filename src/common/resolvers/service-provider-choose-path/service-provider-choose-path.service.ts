namespace profitelo.resolvers.serviceProviderChoosePath {

  import IQService = angular.IQService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IProfileApi = profitelo.api.IProfileApi
  import GetProfile = profitelo.api.GetProfile
  import IUserService = profitelo.services.user.IUserService

  export interface IServiceProviderChoosePathService {
    resolve(): ng.IPromise<GetProfile | null>
  }

  class ServiceProviderChoosePathResolver implements IServiceProviderChoosePathService {

    constructor(private $state: ng.ui.IStateService, private $q: IQService, private topAlertService: ITopAlertService,
                private userService: IUserService, private ProfileApi: IProfileApi, private $log: ng.ILogService) {

    }

    public resolve = () => {
      let _deferred = this.$q.defer<GetProfile | null>()

      this.userService.getUser().then((user) => {
        this.ProfileApi.getProfileRoute(user.id).then((response) => {

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
    'profitelo.api.ProfileApi',
    'profitelo.services.top-alert',
    'profitelo.services.user',
    'profitelo.services.login-state'
  ])
  .service('ServiceProviderChoosePathResolver', ServiceProviderChoosePathResolver)

}
