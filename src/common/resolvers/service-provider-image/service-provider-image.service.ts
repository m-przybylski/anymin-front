module profitelo.resolvers.serviceProviderImage {

  export interface IServiceProviderImageService {
    resolve(token: string): ng.IPromise<string>
  }

  class ServiceProviderImageResolver implements IServiceProviderImageService {

    constructor(private $q: ng.IQService, private FilesApi) {}

    public resolve = (token) => {
      let _deferred = this.$q.defer()
      if (token !== null) {
        this.FilesApi.fileInfoPath({
          token: token
        }).$promise.then((response) => {
          if (angular.isDefined(response) && angular.isDefined(response.previews)) {
            _deferred.resolve(response.previews[0]) // TODO change
          } else {
            _deferred.resolve(null)
          }
        }, () => {
          _deferred.resolve(null)
        })
      } else {
        _deferred.resolve(null)
      }

      return _deferred.promise
    }
  }

  angular.module('profitelo.resolvers.service-provider-image', [
    'profitelo.swaggerResources',
    'profitelo.services.top-alert',
    'c7s.ng.userAuth',
    'profitelo.services.login-state'
  ])
  .service('ServiceProviderImageResolver', ServiceProviderImageResolver)

}
