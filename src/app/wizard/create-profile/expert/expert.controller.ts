import {WizardApi} from 'profitelo-api-ng/api/api'
import {PutWizardProfile, PartialExpertDetails} from 'profitelo-api-ng/model/models'
import * as _ from 'lodash'
import * as angular from 'angular'

export class ExpertController implements ng.IController {
  public inputText: string = ''
  public inputMaxLength: number = 150
  public currentWizardState: PutWizardProfile

  // Models:
  public nameModel?: string = ''
  public avatarModel?: string
  public descriptionModel: string = ''
  public languagesModel: Array<string> = []
  public filesModel?: Array<string> = []
  public linksModel: Array<string> = []
  public dictionary: any

  /* @ngInject */
  constructor(private WizardApi: WizardApi, private wizardProfile: PutWizardProfile) {

    this.dictionary = {
      pl: 'Polska',
      en: 'Angielski',
      ru: 'Ruski'
    }
  }

  $onInit = () => {
    if (this.wizardProfile) {
      this.currentWizardState = angular.copy(this.wizardProfile)
      this.currentWizardState.isExpert = true
      this.currentWizardState.isCompany = false

      this.nameModel = this.wizardProfile.expertDetailsOption!.name
      this.avatarModel = this.wizardProfile.expertDetailsOption!.avatar
      this.filesModel = this.wizardProfile.expertDetailsOption!.files
    } else {
      this.currentWizardState = {
        isExpert: true,
        isCompany: false,
        isSummary: false
      }
    }

    this.WizardApi.putWizardProfileRoute(this.currentWizardState).then((_response) => {
    }, (error) => {
      throw new Error('Can not save ' + error)
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

    if (!this.currentWizardState.expertDetailsOption || !(_.isEqual(this.currentWizardState.expertDetailsOption, wizardExpertModel))) {
      this.currentWizardState.expertDetailsOption = wizardExpertModel
      this.WizardApi.putWizardProfileRoute(this.currentWizardState).then((_response) => {
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
