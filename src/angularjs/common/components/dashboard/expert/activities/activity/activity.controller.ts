import {IExpertActivityComponentBindings} from './activity'
import {GetActivity} from 'profitelo-api-ng/model/models'
import {ModalsService} from '../../../../../services/modals/modals.service'
import {UserService} from '../../../../../services/user/user.service'

export class ExpertActivityComponentController implements ng.IController, IExpertActivityComponentBindings {

  public isCallActivity: boolean
  public activity: GetActivity
  public imageUrl: string | null
  public isCompany: boolean
    constructor(private modalsService: ModalsService, private $log: ng.ILogService, private userService: UserService) {

    this.userService.getUser().then((response) => {
      this.isCompany = response.isCompany
    }, () => {
      this.isCompany = false
    })
  }

  $onInit(): void {
    this.isCallActivity = this.activity.activityType !== GetActivity.ActivityTypeEnum.FINANCIALTRANSACTION
  }

  public openActivityDescription = (): void => {
    if (this.isCallActivity && this.activity.serviceUsageDetails) {
      const sueId: string = this.activity.serviceUsageDetails.serviceUsageEventId
      if (sueId) {
        this.modalsService.createExpertSUEActivityDetailsModal(sueId)
      } else {
        this.$log.error('Activity SUE is undefined')
      }
    } else {
      this.modalsService.createClientChargeDetailsModal(this.activity)
    }
  }

}
