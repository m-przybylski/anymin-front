import {PayoutsApi} from 'profitelo-api-ng/api/api'

export class PayoutsSettingsResolver {
  /* @ngInject */
  constructor(private PayoutsApi: PayoutsApi, private $log: ng.ILogService) {
  }

  public resolve = () => {
    return this.PayoutsApi.getPayoutMethodsRoute().then((payoutsMethod) => {
      return payoutsMethod
    }).catch((error) => {
      if (error.status !== 404) {
        this.$log.error('Can not get list of payouts methods: ' + error)
      }
        return {}

    })
  }

}


