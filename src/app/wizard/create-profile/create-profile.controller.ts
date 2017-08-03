import {WizardApi} from 'profitelo-api-ng/api/api'
import {HttpCodes} from '../../../common/classes/http-codes'

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
      }
    }, (error) => {
      if (error.status === HttpCodes.httpCodes.fileNotFound) {
        this.isLoading = false
      }
    })
  }

  public selectExpertPath = (): void => {
    this.$state.go('app.wizard.create-profile.expert')
  }

  public selectCompanyPath = (): void => {
    this.$state.go('app.wizard.create-profile.company')
  }

}
