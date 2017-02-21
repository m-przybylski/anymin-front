namespace profitelo.resolvers.serviceProviderImage {

  import IFilesApi = profitelo.api.IFilesApi
  export interface IServiceProviderImageService {
    resolve(token: string): ng.IPromise<string | null>
  }

  class ServiceProviderImageResolver implements IServiceProviderImageService {

    constructor(private $q: ng.IQService, private FilesApi: IFilesApi) {}

    public resolve = (token: string): ng.IPromise<string> => {
      let _deferred = this.$q.defer()
      if (token !== null) {
        this.FilesApi.fileInfoPath(token).then((response) => {
          if (angular.isDefined(response) && angular.isDefined(response.previews)) {
            _deferred.resolve(response.previews[0]) // TODO change
          } else {
            _deferred.resolve('')
          }
        }, () => {
          _deferred.resolve('')
        })
      } else {
        _deferred.resolve('')
      }

      return _deferred.promise
    }
  }

  angular.module('profitelo.resolvers.service-provider-image', [
    'profitelo.api.FilesApi',
    'profitelo.services.top-alert',
    'c7s.ng.userAuth',
    'profitelo.services.login-state'
  ])
  .service('ServiceProviderImageResolver', ServiceProviderImageResolver)

}
