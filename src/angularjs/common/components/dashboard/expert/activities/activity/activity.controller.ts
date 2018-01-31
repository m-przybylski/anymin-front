import { IExpertActivityComponentBindings } from './activity';
import { GetActivity } from 'profitelo-api-ng/model/models';
import { ModalsService } from '../../../../../services/modals/modals.service';
import { UserService } from '../../../../../services/user/user.service';

// tslint:disable:member-ordering
export class ExpertActivityComponentController implements ng.IController, IExpertActivityComponentBindings {

  public isCallActivity: boolean;
  public activity: GetActivity;
  public imageUrl: string | null;
  public isCompany: boolean;
  public activityDate: Date;
  public static $inject = ['modalsService', '$log', 'userService'];

    constructor(private modalsService: ModalsService, private $log: ng.ILogService, private userService: UserService) {

    this.userService.getUser().then((response) => {
      this.isCompany = response.isCompany;
    }, () => {
      this.isCompany = false;
    });
  }

  public $onInit(): void {
    this.activityDate = this.activity.initializedAt;
    this.isCallActivity = this.activity.activityType !== GetActivity.ActivityTypeEnum.FINANCIALTRANSACTION;
  }

  public openActivityDescription = (): void => {
    if (this.isCallActivity && this.activity.serviceUsageDetails) {
      const sueId: string = this.activity.serviceUsageDetails.serviceUsageEventId;
      if (sueId) {
        this.modalsService.createExpertSUEActivityDetailsModal(sueId);
      } else {
        this.$log.error('Activity SUE is undefined');
      }
    } else {
      this.modalsService.createClientChargeDetailsModal(this.activity);
    }
  }

}
