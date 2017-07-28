import {PayoutsApi} from 'profitelo-api-ng/api/api'
import {PayoutMethodsDto} from 'profitelo-api-ng/model/models'
import {CommonSettingsService} from '../../../../common/services/common-settings/common-settings.service'

export class PayoutsSettingsResolver {
  /* @ngInject */
  constructor(private PayoutsApi: PayoutsApi, private $log: ng.ILogService,
              private CommonSettingsService: CommonSettingsService) {}

  public resolve = (): ng.IPromise<PayoutMethodsDto> => {
    return this.PayoutsApi.getPayoutMethodsRoute().then((payoutsMethod) => {
      return payoutsMethod
    }).catch((error) => {
      if (error.status !== this.CommonSettingsService.errorStatusCodes.fileNotFound) {
        this.$log.error('Can not get list of payouts methods: ' + error)
      }
      return {}
    })
  }
}
