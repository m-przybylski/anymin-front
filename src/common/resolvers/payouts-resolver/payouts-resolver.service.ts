import * as angular from "angular"
import {PayoutMethodsDto} from "../../api/model/PayoutMethodsDto"
import {PayoutsApi} from "../../api/api/PayoutsApi"
import apiModule from "../../api/api.module"

export interface IPayoutsSettingsService {
  resolve(): ng.IPromise<PayoutMethodsDto>
}

class PayoutsSettingsResolver implements IPayoutsSettingsService {

  constructor(private PayoutsApi: PayoutsApi, private $log: ng.ILogService) {

  }

  public resolve = () => {
    return this.PayoutsApi.getPayoutMethodsRoute().then((payoutsMethods: PayoutMethodsDto) => {
      return payoutsMethods
    }, (error) => {
      if (error.status !== '404') {
        this.$log.error('Can not get list of payouts methods: ' + error)
      }
      return {}
    })
  }

}

angular.module('profitelo.resolvers.payouts-settings', [
  apiModule
])
  .service('payoutsSettingsResolver', PayoutsSettingsResolver)
