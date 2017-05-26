import {WizardApi} from 'profitelo-api-ng/api/api'
import {PutWizardProfile} from 'profitelo-api-ng/model/models'

export class WizardService {

  private currentWizardState: PutWizardProfile

  /* @ngInject */
  constructor(private wizardApi: WizardApi) {
  }

  public getWizardState = () => {
    return this.wizardApi.getWizardProfileRoute().then((wizardProfile) => {
      this.currentWizardState = wizardProfile
    })
  }

  public removeProfile = () => {

  }

  public saveStep = () => {
    return this.wizardApi.putWizardProfileRoute(this.currentWizardState)
  }



}
