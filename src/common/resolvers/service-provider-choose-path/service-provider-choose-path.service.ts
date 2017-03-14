import * as angular from "angular"

import IQService = angular.IQService
import apiModule from "profitelo-api-ng/api.module"
import {ProfileApi} from "profitelo-api-ng/api/api"
import {GetProfile} from "profitelo-api-ng/model/models"
import {TopAlertService} from "../../services/top-alert/top-alert.service"
import {UserService} from "../../services/user/user.service"
import userModule from "../../services/user/user"
import topAlertModule from "../../services/top-alert/top-alert"
import loginStateModule from "../../services/login-state/login-state"

export interface IServiceProviderChoosePathService {
  resolve(): ng.IPromise<GetProfile | null>
}

export class ServiceProviderChoosePathResolver implements IServiceProviderChoosePathService {

  constructor(private $state: ng.ui.IStateService, private $q: IQService, private topAlertService: TopAlertService,
              private userService: UserService, private ProfileApi: ProfileApi, private $log: ng.ILogService) {

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
  apiModule,
  topAlertModule,
  userModule,
  loginStateModule
])
  .service('ServiceProviderChoosePathResolver', ServiceProviderChoosePathResolver)
