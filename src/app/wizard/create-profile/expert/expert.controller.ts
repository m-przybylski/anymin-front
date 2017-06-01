import {WizardApi} from 'profitelo-api-ng/api/api'
import {PutWizardProfile, PartialExpertDetails, GetWizardProfile} from 'profitelo-api-ng/model/models'
import * as _ from 'lodash'
import * as angular from 'angular'

export class ExpertController implements ng.IController {
  public currentWizardState: PutWizardProfile = {
    isExpert: false,
    isCompany: false,
    isSummary: false
  }
  public nameModel?: string = ''
  public avatarModel?: string
  public descriptionModel?: string = ''
  public languagesModel?: Array<string> = []
  public filesModel?: Array<string> = []
  public linksModel?: Array<string> = []
  public languagesList: {
    [key: string]: string
  }

  /* @ngInject */
  constructor(private WizardApi: WizardApi, private $state: ng.ui.IStateService,
              private wizardProfile?: GetWizardProfile) {

    this.languagesList = {
      pl: 'Polski',
      en: 'Angielski',
      ru: 'Rosyjski'
    }
  }

  $onInit = () => {

    if (this.wizardProfile) {
      this.currentWizardState = angular.copy(this.wizardProfile)
      if (this.wizardProfile.expertDetailsOption) {
        this.nameModel = this.wizardProfile.expertDetailsOption!.name
        this.avatarModel = this.wizardProfile.expertDetailsOption!.avatar
        this.filesModel = this.wizardProfile.expertDetailsOption!.files
        this.languagesModel = this.wizardProfile.expertDetailsOption!.languages
        this.descriptionModel = this.wizardProfile.expertDetailsOption!.description
        this.linksModel = this.wizardProfile.expertDetailsOption!.links
      }
    }
    this.currentWizardState.isExpert = true
    this.currentWizardState.isCompany = false
    this.WizardApi.putWizardProfileRoute(this.currentWizardState).then((_response) => {
    }, (error) => {
      throw new Error('Can not save' +  error)
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

  public goToSummary = () => {
    if (this.currentWizardState.expertDetailsOption
      && this.currentWizardState.expertDetailsOption.name
      && this.currentWizardState.expertDetailsOption.avatar
      && this.currentWizardState.expertDetailsOption.description
      && this.currentWizardState.expertDetailsOption.languages) {
      this.$state.go('app.wizard.summary')
    }
  }

  // Validations Methods:
  public checkNameInput = () => {
    return this.currentWizardState.expertDetailsOption && this.currentWizardState.expertDetailsOption.name &&
      this.currentWizardState.expertDetailsOption.name.length > 2
  }

}
