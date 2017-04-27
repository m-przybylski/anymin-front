import {IExpertNoActivitiesComponentBindings} from './no-activities'
export class ExpertNoActivitiesComponentController implements IExpertNoActivitiesComponentBindings {

  public translationPayoutsHref: {
    hrefUrl: string
  }
  public activeAccountTranslation: string

  /* @ngInject */
  constructor() {
    this.translationPayoutsHref = {
      hrefUrl: '/dashboard/settings/payouts'
    }
    this.activeAccountTranslation = 'DASHBOARD.EXPERT_ACCOUNT.NO_ACTIVITIES.DSC'
  }

}
