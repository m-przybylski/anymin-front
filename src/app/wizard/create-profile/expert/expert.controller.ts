import {WizardApi} from 'profitelo-api-ng/api/api'
import {PutWizardProfile, PartialExpertDetails} from 'profitelo-api-ng/model/models'
import * as angular from 'angular'

export class ExpertController implements ng.IController {
  public inputText: string = ''
  public inputMaxLength: number = 150
  public currentWizardState: PutWizardProfile

  // Models:
  public nameModel: string = ''
  public avatarModel: string
  public descriptionModel: string = ''
  public languagesModel: Array<string> = []
  public filesModel: Array<string> = []
  public linksModel: Array<string> = []
  public dictionary: any

  /* @ngInject */
  constructor(private WizardApi: WizardApi) {
    this.dictionary = {
      pl: 'Polska',
      en: 'Angielski',
      ru: 'Ruski'
    }
  }

  $onInit = () => {
    this.WizardApi.getWizardProfileRoute().then((wizardProfile) => {
      this.currentWizardState = angular.copy(wizardProfile)
      this.currentWizardState.isExpert = true
      this.currentWizardState.isCompany = false
      this.WizardApi.putWizardProfileRoute(this.currentWizardState).then((_response) => {
      }, (error) => {
        throw new Error('Can not save ' + error)
      })
    }, () => {
      this.currentWizardState = {
        isExpert: true,
        isCompany: false
      }
      this.WizardApi.putWizardProfileRoute(this.currentWizardState).then((_response) => {

      }, (error) => {
        throw new Error('Can not save ' + error)
      })
    })
  }

  public saveSteps = () => {
    const wizardExpertModel: PartialExpertDetails = {
      name: this.nameModel,
      avatar: this.avatarModel,
      description: this.descriptionModel,
      languages: this.languagesModel,
      files: this.filesModel,
      links: this.linksModel
    }
    if (this.currentWizardState.expertDetailsOption && this.currentWizardState.expertDetailsOption!.name !== this.nameModel) {
      this.currentWizardState.expertDetailsOption = wizardExpertModel
      this.WizardApi.putWizardProfileRoute(this.currentWizardState).then((response) => {
        console.log(response)
      }, (error) => {
        throw new Error('Can not save profile steps' + error)
      })
    }
  }

  // Validations Methods:
  public checkNameInput = () => {
    return this.currentWizardState.expertDetailsOption && this.currentWizardState.expertDetailsOption.name &&
      this.currentWizardState.expertDetailsOption.name.length > 2
  }

}
