import * as angular from "angular"
import {GetSession} from "../../api/model/GetSession"
import {SessionApi} from "../../api/api/SessionApi"
import apiModule from "../../api/api.module"

export interface ISecuritySettingsService {
  resolve(): ng.IPromise<Array<GetSession>>
}

class SecuritySettingsResolver implements ISecuritySettingsService {

  constructor(private SessionApi: SessionApi, private $log: ng.ILogService) {

  }

  public resolve = () => {
    return this.SessionApi.getSessionsRoute().then((sessionList) => {
      return sessionList
    }, (error: any) => {
      this.$log.error('Can not get sessions list: ' + error)
      return []
    })
  }

}

angular.module('profitelo.resolvers.security-settings', [
  apiModule
])
  .service('securitySettingsResolver', SecuritySettingsResolver)
