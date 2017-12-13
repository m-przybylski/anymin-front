import {WizardApi} from 'profitelo-api-ng/api/api'
import {PutWizardProfile, PartialExpertDetails, GetWizardProfile} from 'profitelo-api-ng/model/models'
import * as _ from 'lodash'
import * as angular from 'angular'
import {IProgressStyle} from '../../../../common/components/wizard/wizard-handler/wizard-handler.controller'
import {CommonSettingsService} from '../../../../common/services/common-settings/common-settings.service'
import {Config} from '../../../config';

export class ExpertController implements ng.IController {
  public readonly inputNameMaxLength: string = Config.inputsMaxLength.profileName
  public readonly inputDescriptionMaxLength: string = Config.inputsMaxLength.profileDescription
  public currentWizardState: PutWizardProfile = {
    isExpert: false,
    isCompany: false,
    isSummary: false
  }
  public nameModel?: string = ''
  public avatarModel?: string
  public descriptionModel?: string = ''
  public filesModel?: string[] = []
  public linksModel?: string[] = []
  public progressStyle: IProgressStyle
  public progressBarTittle: string = 'WIZARD.STEP.EXPERT.PROGRESSBAR.TITLE'
  public isSubmitted: boolean = false
  public isStepRequired: boolean = true
  private isUploading: boolean = true
  private profileNamePattern: RegExp
  private profileDescriptionPattern: RegExp

  /* @ngInject */
  constructor(private WizardApi: WizardApi,
              private $state: ng.ui.IStateService,
              private CommonSettingsService: CommonSettingsService,
              private wizardProfile?: GetWizardProfile) {
    this.assignValidationValues()
  }

  $onInit = (): void => {
    if (this.wizardProfile) {
      this.currentWizardState = angular.copy(this.wizardProfile)
      if (this.wizardProfile.expertDetailsOption) {
        this.nameModel = this.wizardProfile.expertDetailsOption.name
        this.avatarModel = this.wizardProfile.expertDetailsOption.avatar
        this.filesModel = this.wizardProfile.expertDetailsOption.files
        this.descriptionModel = this.wizardProfile.expertDetailsOption.description
        this.linksModel = this.wizardProfile.expertDetailsOption.links
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

  public onGoBack = (): void => {
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

  public saveSteps = (): void => {
    const wizardExpertModel: PartialExpertDetails = {
      name: this.nameModel,
      avatar: this.avatarModel,
      description: this.descriptionModel,
      files: this.filesModel,
      links: this.linksModel
    }

    if (this.checkIsAnyStepModelChange(wizardExpertModel)) {
      this.currentWizardState.expertDetailsOption = angular.copy(wizardExpertModel)
      this.saveWizardState(this.currentWizardState)
    }
  }

  public goToSummary = (): void => {
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

  public checkIsNameInputValid = (): boolean => this.nameModel ?
    this.profileNamePattern.test(this.nameModel) : false

  public checkIsAvatarValid = (): boolean => !!(this.avatarModel && this.avatarModel.length > 0)

  public checkIsProfileDescriptionValid = (): boolean => this.descriptionModel ?
    this.profileDescriptionPattern.test(this.descriptionModel) : false

  public checkIsFileUploadValid = (): boolean => this.isUploading

  public onUploadingFile = (status: boolean): void => {
    this.isUploading = status
  }

  public checkIsFormValid = (): boolean =>
    !!(this.currentWizardState.expertDetailsOption
      && this.checkIsNameInputValid()
      && this.checkIsAvatarValid()
      && this.checkIsProfileDescriptionValid()
      && this.checkIsFileUploadValid())

  private saveWizardState = (wizardState: PutWizardProfile): ng.IPromise<GetWizardProfile> =>
    this.WizardApi.putWizardProfileRoute(wizardState)
    .catch((error) => {
      throw new Error('Can not save profile steps' + error)
    })

  private checkIsAnyStepModelChange = (currentFormModel: PartialExpertDetails): boolean =>
    !this.currentWizardState.expertDetailsOption
      || !(_.isEqual(this.currentWizardState.expertDetailsOption, currentFormModel))

  private assignValidationValues = (): void => {
    const localSettings = this.CommonSettingsService.localSettings
    this.profileNamePattern = localSettings.profileNamePattern
    this.profileDescriptionPattern = localSettings.profileDescriptionPattern
  }
}
