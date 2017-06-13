import {GetWizardProfile, PartialExpertDetails, WizardService} from 'profitelo-api-ng/model/models'
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
  public services?: WizardService[]

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService, private WizardApi: WizardApi, private wizardProfile?: GetWizardProfile) {

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

  $onInit() {
    if (this.wizardProfile) {
      this.isConsultation = !!(this.wizardProfile.services
      && this.wizardProfile.services.length > 0)
      this.services = this.wizardProfile.services
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

  public saveWizard = () => {

  }

}
