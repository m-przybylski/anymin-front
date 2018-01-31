import { ModalsService } from '../../../../../../services/modals/modals.service';
import { GetActivity } from 'profitelo-api-ng/model/models';
import { IClientActivityComponentBindings } from './activity';

// tslint:disable:member-ordering
export class ClientActivityComponentController implements ng.IController, IClientActivityComponentBindings {

  public activity: GetActivity;
  public isCallActivity: boolean;
  public imageToken?: string;
  public activityDate: Date;
  public static $inject = ['modalsService', '$log'];

    constructor(private modalsService: ModalsService, private $log: ng.ILogService) {
  }

  public $onInit(): void {
    this.activityDate = this.activity.initializedAt;
    if (this.activity.serviceUsageDetails) this.imageToken = this.activity.serviceUsageDetails.expertAvatar;
  }

  public openActivityDescription = (): void => {
    if (this.isCallActivity) {
      // tslint:disable-next-line:no-non-null-assertion
      const sueId = this.activity.serviceUsageDetails!.serviceUsageEventId;
      if (sueId) {
        this.modalsService.createClientSUEActivityDetailsModal(sueId);
      } else {
        this.$log.error('Activity SUE is undefined');
      }
    } else {
      this.modalsService.createClientChargeDetailsModal(this.activity);
    }
  }
}
