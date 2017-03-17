import * as angular from 'angular'
import apiModule from 'profitelo-api-ng/api.module'
import {PayoutsApi} from 'profitelo-api-ng/api/api'
import {PayoutMethodsDto} from 'profitelo-api-ng/model/models'

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
