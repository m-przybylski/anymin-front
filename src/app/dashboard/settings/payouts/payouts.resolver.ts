import {PayoutsApi} from 'profitelo-api-ng/api/api'
import {GetPayoutMethodDto} from 'profitelo-api-ng/model/models'
import {httpCodes} from '../../../../common/classes/http-codes'

export class PayoutsSettingsResolver {
  /* @ngInject */
  constructor(private PayoutsApi: PayoutsApi, private $log: ng.ILogService) {
  }

  public resolve = (): ng.IPromise<GetPayoutMethodDto> =>
    this.PayoutsApi.getPayoutMethodsRoute()
    .then((payoutsMethod) => payoutsMethod).catch((error) => {
      if (error.status !== httpCodes.notFound) {
        this.$log.error('Can not get list of payouts methods: ' + error)
      }
      return {}
    })
}
