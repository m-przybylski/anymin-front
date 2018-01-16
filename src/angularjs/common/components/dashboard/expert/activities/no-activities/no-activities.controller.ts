import {IExpertNoActivitiesComponentBindings} from './no-activities'
import {Config} from '../../../../../../../config';

export class ExpertNoActivitiesComponentController implements IExpertNoActivitiesComponentBindings {

  public translationPayoutsHref: {
    hrefUrl: string
  }
  public activeAccountTranslation: string
  public isPlatformForExpert: boolean = Config.isPlatformForExpert
  public isPayoutMethod: boolean

  static $inject = [];

  constructor() {
    this.translationPayoutsHref = {
      hrefUrl: '/dashboard/settings/payouts'
    }
    this.activeAccountTranslation = 'DASHBOARD.EXPERT_ACCOUNT.NO_ACTIVITIES.DSC'
  }

}
