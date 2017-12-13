import {IExpertNoActivitiesComponentBindings} from './no-activities'
import {Config} from '../../../../../../app/config';

export class ExpertNoActivitiesComponentController implements IExpertNoActivitiesComponentBindings {

  public translationPayoutsHref: {
    hrefUrl: string
  }
  public activeAccountTranslation: string
  public isPlatformForExpert: boolean = Config.isPlatformForExpert
  public isPayoutMethod: boolean

  /* @ngInject */
  constructor() {
    this.translationPayoutsHref = {
      hrefUrl: '/dashboard/settings/payouts'
    }
    this.activeAccountTranslation = 'DASHBOARD.EXPERT_ACCOUNT.NO_ACTIVITIES.DSC'
  }

}
