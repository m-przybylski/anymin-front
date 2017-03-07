namespace profitelo.resolvers.payoutsSettings {

  import PayoutMethodsDto = profitelo.api.PayoutMethodsDto
  import IPayoutsApi = profitelo.api.IPayoutsApi
  export interface IPayoutsSettingsService {
    resolve(): ng.IPromise<PayoutMethodsDto>
  }

  class PayoutsSettingsResolver implements IPayoutsSettingsService {

    constructor(private PayoutsApi: IPayoutsApi, private $log: ng.ILogService) {

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
    'profitelo.api.PayoutsApi',
  ])
  .service('payoutsSettingsResolver', PayoutsSettingsResolver)

}
