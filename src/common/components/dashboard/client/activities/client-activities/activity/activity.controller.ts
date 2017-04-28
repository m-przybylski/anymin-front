import {ModalsService} from '../../../../../../services/modals/modals.service'
import {UrlService} from '../../../../../../services/url/url.service'
import {GetActivity} from 'profitelo-api-ng/model/models'
import {IClientActivityComponentBindings} from './activity'

export class ClientActivityComponentController implements ng.IController, IClientActivityComponentBindings {

  public activity: GetActivity
  public isCallActivity: boolean
  public imageUrl: string | null

  /* @ngInject */
  constructor(private urlService: UrlService, private modalsService: ModalsService, private $log: ng.ILogService) {
  }

  $onInit() {
    this.isCallActivity = this.activity.activityType !== GetActivity.ActivityTypeEnum.FINANCIALTRANSACTION
    if (this.activity.serviceUsageDetails && this.activity.serviceUsageDetails.expertAvatar) {
      this.imageUrl = this.urlService.resolveFileUrl(this.activity.serviceUsageDetails.expertAvatar)
    } else {
      this.imageUrl = null
    }
  }

  public openActivityDescription = () => {

    if (this.isCallActivity) {
      const sueId = this.activity.serviceUsageDetails!.serviceUsageEventId
      if (sueId) {
        this.modalsService.createClientSUEActivityDetailsModal(sueId)
      }
      else {
        this.$log.error('Activity SUE is undefined')
      }
    } else {
      this.modalsService.createClientChargeDetailsModal(<any>this.activity)
    }

  }
}
