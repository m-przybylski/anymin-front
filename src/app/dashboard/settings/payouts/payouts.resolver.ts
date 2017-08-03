import {PayoutsApi} from 'profitelo-api-ng/api/api'
import {PayoutMethodsDto} from 'profitelo-api-ng/model/models'
import {HttpCodes} from '../../../../common/classes/http-codes'

export class PayoutsSettingsResolver {
  /* @ngInject */
  constructor(private PayoutsApi: PayoutsApi, private $log: ng.ILogService) {}

  public resolve = (): ng.IPromise<PayoutMethodsDto> => {
    return this.PayoutsApi.getPayoutMethodsRoute().then((payoutsMethod) => {
      return payoutsMethod
    }).catch((error) => {
      if (error.status !== HttpCodes.httpCodes.fileNotFound) {
        this.$log.error('Can not get list of payouts methods: ' + error)
      }
      return {}
    })
  }
}
