import {ModalsService} from '../../../../../../services/modals/modals.service'
import {GetActivity} from 'profitelo-api-ng/model/models'
import {IClientActivityComponentBindings} from './activity'

export class ClientActivityComponentController implements ng.IController, IClientActivityComponentBindings {

  public activity: GetActivity
  public isCallActivity: boolean
  public imageToken?: string

    constructor(private modalsService: ModalsService, private $log: ng.ILogService) {
  }

  $onInit(): void {
    if (this.activity.serviceUsageDetails) this.imageToken = this.activity.serviceUsageDetails.expertAvatar
  }

  public openActivityDescription = (): void => {
    if (this.isCallActivity) {
      const sueId: string = this.activity.serviceUsageDetails!.serviceUsageEventId
      if (sueId) {
        this.modalsService.createClientSUEActivityDetailsModal(sueId)
      } else {
        this.$log.error('Activity SUE is undefined')
      }
    } else {
      this.modalsService.createClientChargeDetailsModal(this.activity)
    }
  }
}
