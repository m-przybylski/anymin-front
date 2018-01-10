import {PutWizardProfile, PartialOrganizationDetails, GetWizardProfile} from 'profitelo-api-ng/model/models'
import {WizardApi} from 'profitelo-api-ng/api/api'
import {StateService} from '@uirouter/angularjs'

import * as _ from 'lodash'
import * as angular from 'angular'
import {CommonSettingsService} from '../../../../common/services/common-settings/common-settings.service'
import {Config} from '../../../config';

export class CompanyController implements ng.IController {
  public readonly inputDescriptionMaxLength: string = Config.inputsMaxLength.profileDescription
  public readonly inputNameMaxLength: string = Config.inputsMaxLength.profileName
  public currentWizardState: PutWizardProfile = {
    isExpert: false,
    isCompany: false,
    isSummary: false
  }

  public nameModel?: string = ''
  public logoModel?: string
  public descriptionModel?: string = ''
  public filesModel?: string[] = []
  public linksModel?: string[] = []
  public dictionary: {
    [key: string]: string
  }
  public isSubmitted: boolean = false
  public isStepRequired: boolean = true
  private isUploading: boolean = true
  private companyNamePattern: RegExp
  private companyDescriptionPattern: RegExp

    constructor(private WizardApi: WizardApi,
              private $state: StateService,
              private CommonSettingsService: CommonSettingsService,
              private wizardProfile?: GetWizardProfile) {
    this.assignValidationValues()
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

  $onInit = (): void => {
    if (this.wizardProfile) {
      this.currentWizardState = angular.copy(this.wizardProfile)
      if (this.wizardProfile.organizationDetailsOption) {
        this.nameModel = this.wizardProfile.organizationDetailsOption.name
        this.logoModel = this.wizardProfile.organizationDetailsOption.logo
        this.filesModel = this.wizardProfile.organizationDetailsOption.files
        this.descriptionModel = this.wizardProfile.organizationDetailsOption.description
        this.linksModel = this.wizardProfile.organizationDetailsOption.links
      }
    }
    this.currentWizardState.isCompany = true
    if (!this.wizardProfile || this.wizardProfile.isExpert && !this.wizardProfile.isSummary) {
      this.currentWizardState.isExpert = false
    }
    this.saveWizardState(this.currentWizardState)
  }

  public saveSteps = (): void => {
    const wizardOrganizationModel: PartialOrganizationDetails = {
      name: this.nameModel,
      logo: this.logoModel,
      description: this.descriptionModel,
      files: this.filesModel,
      links: this.linksModel
    }

    if (this.checkIsAnyStepModelChange(wizardOrganizationModel)) {
      this.currentWizardState.organizationDetailsOption = angular.copy(wizardOrganizationModel)
      this.saveWizardState(this.currentWizardState)
    }
  }

  public goToSummary = (): void => {
    if (this.checkIsFormValid()) {
      this.currentWizardState.organizationDetailsOption!.links = this.linksModel
      this.currentWizardState.isSummary = true
      this.saveWizardState(this.currentWizardState).then(() => {
        this.$state.go('app.wizard.summary')
      })
    } else {
      this.isSubmitted = true
    }
  }

  public checkIsNameInputValid = (): boolean => this.nameModel ? this.companyNamePattern.test(this.nameModel) : false

  public checkIsLogoValid = (): boolean => (this.logoModel) ? this.logoModel.length > 0 : false

  public checkIsProfileDescriptionValid = (): boolean =>
    this.descriptionModel ? this.companyDescriptionPattern.test(this.descriptionModel) : false

  public checkIsFileUploadValid = (): boolean => this.isUploading

  public onUploadingFile = (status: boolean): void => {
    this.isUploading = status
  }

  public checkIsFormValid = (): boolean =>
    !!(this.currentWizardState.organizationDetailsOption
    && this.checkIsNameInputValid()
    && this.checkIsLogoValid()
    && this.checkIsProfileDescriptionValid()
    && this.checkIsFileUploadValid()
    )

  private saveWizardState = (wizardState: PutWizardProfile): ng.IPromise<GetWizardProfile> =>
    this.WizardApi.putWizardProfileRoute(wizardState)
    .catch((error) => {
      throw new Error('Can not save profile steps' + String(error))
    })

  private checkIsAnyStepModelChange = (currentFormModel: PartialOrganizationDetails): boolean =>
    !this.currentWizardState.organizationDetailsOption
      || !(_.isEqual(this.currentWizardState.organizationDetailsOption, currentFormModel))

  private assignValidationValues = (): void => {
    const localSettings = this.CommonSettingsService.localSettings
    this.companyNamePattern = localSettings.profileNamePattern
    this.companyDescriptionPattern = localSettings.profileDescriptionPattern
  }

}
