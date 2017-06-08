import {WizardApi} from 'profitelo-api-ng/api/api'

export class CreateProfileController implements ng.IController {

  public isLoading: boolean = true
  public isSummary: boolean = false

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService, WizardApi: WizardApi, previousState: string) {
    WizardApi.getWizardProfileRoute().then((wizardProfile) => {
      this.isSummary = wizardProfile.isSummary
      this.isLoading = false
      if (wizardProfile.isSummary && previousState !== 'app.wizard.summary') {
        this.$state.go('app.wizard.summary')
      } else if (wizardProfile.isExpert) {
        this.$state.go('app.wizard.create-profile.expert')
      } else if (wizardProfile.isCompany) {
        this.$state.go('app.wizard.create-profile.company')
      }
    }, (error) => {
      if (error.status === 404) {
        this.isLoading = false
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
