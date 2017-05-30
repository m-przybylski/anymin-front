import {WizardApi} from 'profitelo-api-ng/api/api'

export class CreateProfileController implements ng.IController {


  /* @ngInject */
  constructor(private $state: ng.ui.IStateService, WizardApi: WizardApi) {
    WizardApi.getWizardProfileRoute().then((wizardProfile) => {
      if (wizardProfile.isExpert) {
        this.$state.go('app.wizard.create-profile.expert')
      } else if(wizardProfile.isCompany) {
        this.$state.go('app.wizard.create-profile.company')
      }
    })
  }

  public selectExpertPath = () => {
    this.$state.go('app.wizard.create-profile.expert')
  }

  public selectCompanyPath = () => {
    this.$state.go('app.wizard.create-profile.company')
  }

}
