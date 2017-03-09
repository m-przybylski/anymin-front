import * as angular from "angular"
import {FilesApi} from "../../api/api/FilesApi"
import apiModule from "../../api/api.module"
import topAlertModule from "../../services/top-alert/top-alert"
import sessionModule from "../../services/session/session"
import loginStateModule from "../../services/login-state/login-state"
export interface IServiceProviderImageService {
  resolve(token: string): ng.IPromise<string | null>
}

class ServiceProviderImageResolver implements IServiceProviderImageService {

  constructor(private $q: ng.IQService, private FilesApi: FilesApi) {
  }

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
  apiModule,
  topAlertModule,
  sessionModule,
  loginStateModule
])
  .service('ServiceProviderImageResolver', ServiceProviderImageResolver)
