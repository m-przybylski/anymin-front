// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
import { IExpertActivityComponentBindings } from './activity';
import { GetProfileActivity } from 'profitelo-api-ng/model/models';
import { ModalsService } from '../../../../../services/modals/modals.service';
import { UserService } from '../../../../../services/user/user.service';

// tslint:disable:member-ordering
export class ExpertActivityComponentController implements ng.IController, IExpertActivityComponentBindings {

  public isCallActivity: boolean;
  public activity: GetProfileActivity;
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
    this.isCallActivity = this.activity.activityType === GetProfileActivity.ActivityTypeEnum.SERVICEUSAGEEVENT;
  }

  public openActivityDescription = (): void => {
    if (this.isCallActivity && this.activity.serviceUsageDetails) {
      const sueId = this.activity.serviceUsageDetails.serviceUsageEventId;
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
