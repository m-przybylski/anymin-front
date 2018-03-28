import { IExpertNoActivitiesComponentBindings } from './no-activities';
import { Config } from '../../../../../../../config';

// tslint:disable:member-ordering
export class ExpertNoActivitiesComponentController implements IExpertNoActivitiesComponentBindings {

  public translationPayoutsHref: {
    hrefUrl: string
  };
  public activeAccountTranslation: string;
  public isPlatformForExpert = Config.isPlatformForExpert;
  public isPayoutDataAlertVisible: boolean;

  public static $inject = [];

  constructor() {
    this.translationPayoutsHref = {
      hrefUrl: '/dashboard/settings/payouts'
    };
    this.activeAccountTranslation = 'DASHBOARD.EXPERT_ACCOUNT.NO_ACTIVITIES.DSC';
  }

}
