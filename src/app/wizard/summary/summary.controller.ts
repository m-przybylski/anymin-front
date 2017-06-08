import {GetWizardProfile, PartialExpertDetails} from 'profitelo-api-ng/model/models'
import {WizardApi} from 'profitelo-api-ng/api/api'
export class SummaryController implements ng.IController {

  public name?: string = ''
  public avatar?: string
  public description?: string = ''
  public languages?: Array<string> = []
  public files?: Array<string> = []
  public links?: Array<string> = []
  public isExpert: boolean
  public wizardProfileData?: PartialExpertDetails
  public isConsultation: boolean = false

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService, private WizardApi: WizardApi, wizardProfile?: GetWizardProfile) {

    if (wizardProfile) {
      if (wizardProfile.expertDetailsOption && wizardProfile.isExpert) {
        this.isExpert = wizardProfile.isExpert
        this.wizardProfileData = wizardProfile.expertDetailsOption

      } else if (wizardProfile.organizationDetailsOption && wizardProfile.isCompany) {
        this.isExpert = wizardProfile.isExpert
        this.wizardProfileData = wizardProfile.organizationDetailsOption
      }
    } else {
      $state.go('app.wizard.create-profile')
    }

  }

  public onMainProfileDelete = () => {
    this.WizardApi.putWizardProfileRoute({
      isSummary: false,
      isCompany: false,
      isExpert: false
    }).then(() => {
      this.$state.go('app.wizard.create-profile')
    }, (error) => {
      throw new Error(error)
    })
  }

}
