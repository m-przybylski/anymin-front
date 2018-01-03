import * as angular from 'angular'
import apiModule from 'profitelo-api-ng/api.module'
import {SessionApi} from 'profitelo-api-ng/api/api'
import {GetSession} from 'profitelo-api-ng/model/models'

export interface ISecuritySettingsService {
  resolve(): ng.IPromise<GetSession[]>
}

export class SecuritySettingsResolver implements ISecuritySettingsService {

  constructor(private SessionApi: SessionApi, private $log: ng.ILogService) {

  }

  public resolve = (): ng.IPromise<GetSession[]> =>
    this.SessionApi.getSessionsRoute().then((sessionList) => sessionList, (error: any) => {
      this.$log.error('Can not get sessions list: ' + String(error))
      return []
    })

}

angular.module('profitelo.resolvers.security-settings', [
  apiModule
])
  .service('securitySettingsResolver', SecuritySettingsResolver)
