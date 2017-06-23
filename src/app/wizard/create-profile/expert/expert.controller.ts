import {WizardApi} from 'profitelo-api-ng/api/api'
import {PutWizardProfile, PartialExpertDetails, GetWizardProfile} from 'profitelo-api-ng/model/models'
import * as _ from 'lodash'
import * as angular from 'angular'
import {IProgressStyle} from '../../../../common/components/wizard/wizard-handler/wizard-handler.controller'

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

  public progressStyle: IProgressStyle
  public progressBarTittle: string = 'WIZARD.STEP.EXPERT.PROGRESSBAR.TITLE'
  public isSubmitted: boolean = false
  public isStepRequired: boolean = true
  private isUploading: boolean = true

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
    if (!this.wizardProfile || this.wizardProfile.isCompany && !this.wizardProfile.isSummary) {
      this.currentWizardState.isCompany = false
    }
    this.progressBarTittle = this.currentWizardState.isCompany ?
      'WIZARD.STEP.EXPERT_AS_COMPANY.PROGRESSBAR.TITLE' : 'WIZARD.STEP.EXPERT.PROGRESSBAR.TITLE'
    this.saveWizardState(this.currentWizardState)
  }

  public onGoBack = () => {
    if (this.wizardProfile && !this.wizardProfile.isSummary) {
      this.currentWizardState.isExpert = false
      this.currentWizardState.isCompany = false
      this.saveWizardState(this.currentWizardState).then(() => {
        this.$state.go('app.wizard.create-profile')
      })
    } else {
      this.goToSummary()
    }
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

    if (this.checkIsAnyStepModelChange(wizardExpertModel)) {
      this.currentWizardState.expertDetailsOption = angular.copy(wizardExpertModel)
      this.saveWizardState(this.currentWizardState)
    }
  }

  public goToSummary = () => {
    if (this.checkIsFormValid()) {
      this.currentWizardState.expertDetailsOption!.links = this.linksModel
      this.currentWizardState.isSummary = true
      this.saveWizardState(this.currentWizardState).then(() => {
        this.$state.go('app.wizard.summary')
      })
    } else {
      this.isSubmitted = true
    }
  }

  public checkIsNameInputValid = (): boolean => {
    return !!(this.nameModel && this.nameModel.length > 2)
  }

  public checkIsAvatarValid = (): boolean => {
    return !!(this.avatarModel && this.avatarModel.length > 0)
  }

  public checkIsLanguagesValid = (): boolean => {
    return !!(this.languagesModel && this.languagesModel.length > 0)
  }

  public checkIsProfileDescriptionValid = (): boolean => {
    return !!(this.descriptionModel && this.descriptionModel.length >= 50)
  }

  public checkIsFileUploadValid = (): boolean => {
    return this.isUploading
  }

  public onUploadingFile = (status: boolean) => {
    this.isUploading = status
  }

  public checkIsFormValid = (): boolean => {
    return !!(this.currentWizardState.expertDetailsOption
      && this.checkIsNameInputValid()
      && this.checkIsAvatarValid()
      && this.checkIsLanguagesValid()
      && this.checkIsProfileDescriptionValid()
      && this.checkIsFileUploadValid()
    )
  }

  private saveWizardState = (wizardState: PutWizardProfile) => {
    return this.WizardApi.putWizardProfileRoute(wizardState)
    .catch((error) => {
      throw new Error('Can not save profile steps' + error)
    })
  }

  private checkIsAnyStepModelChange = (currentFormModel: PartialExpertDetails) => {
    return !this.currentWizardState.expertDetailsOption
      || !(_.isEqual(this.currentWizardState.expertDetailsOption, currentFormModel))
  }

}
