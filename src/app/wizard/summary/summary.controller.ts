import {GetWizardProfile} from 'profitelo-api-ng/model/models'
export class SummaryController implements ng.IController {

  public name?: string = ''
  public avatar?: string
  public description?: string = ''
  public languages?: Array<string> = []
  public files?: Array<string> = []
  public links?: Array<string> = []

  /* @ngInject */
  constructor($state: ng.ui.IStateService, wizardProfile?: GetWizardProfile) {
    if (wizardProfile) {
      if (wizardProfile.expertDetailsOption && wizardProfile.isExpert) {
        this.name = wizardProfile.expertDetailsOption!.name
        this.avatar = wizardProfile.expertDetailsOption!.avatar
        this.files = wizardProfile.expertDetailsOption!.files
        this.languages = wizardProfile.expertDetailsOption!.languages
        this.description = wizardProfile.expertDetailsOption!.description
        this.links = wizardProfile.expertDetailsOption!.links
      } else if (wizardProfile.organizationDetailsOption && wizardProfile.isCompany) {
        this.name = wizardProfile.organizationDetailsOption!.name
        this.avatar = wizardProfile.organizationDetailsOption!.logo
        this.files = wizardProfile.organizationDetailsOption!.files
        this.description = wizardProfile.organizationDetailsOption!.description
        this.links = wizardProfile.organizationDetailsOption!.links
      }
    } else {
      //$state.go('app.wizard.create-profile')
    }
  }
}
