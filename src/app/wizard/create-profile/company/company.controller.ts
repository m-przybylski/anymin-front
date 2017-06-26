import {PutWizardProfile, PartialOrganizationDetails, GetWizardProfile} from 'profitelo-api-ng/model/models'
import {WizardApi} from 'profitelo-api-ng/api/api'

import * as _ from 'lodash'
import * as angular from 'angular'

export class CompanyController implements ng.IController {
  public currentWizardState: PutWizardProfile = {
    isExpert: false,
    isCompany: false,
    isSummary: false
  }

  public nameModel?: string = ''
  public logoModel?: string
  public descriptionModel?: string = ''
  public filesModel?: Array<string> = []
  public linksModel?: Array<string> = []
  public dictionary: {
    [key: string]: string
  }

  public isSubmitted: boolean = false
  public isStepRequired: boolean = true
  private isUploading: boolean = true

  /* @ngInject */
  constructor(private WizardApi: WizardApi, private $state: ng.ui.IStateService,
              private wizardProfile?: GetWizardProfile) {
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

  $onInit = () => {
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

  public saveSteps = () => {
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

  public goToSummary = () => {
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

  public checkIsNameInputValid = () => {
    return this.nameModel && this.nameModel.length > 2
  }

  public checkIsLogoValid = () => {
    return this.logoModel && this.logoModel.length > 0
  }

  public checkIsProfileDescriptionValid = () => {
    return this.descriptionModel && this.descriptionModel.length > 49
  }

  public checkIsFileUploadValid = (): boolean => {
    return this.isUploading
  }

  public onUploadingFile = (status: boolean) => {
    this.isUploading = status
  }

  public checkIsFormValid = (): boolean => {
    return !!(this.currentWizardState.organizationDetailsOption
    && this.checkIsNameInputValid()
    && this.checkIsLogoValid()
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

  private checkIsAnyStepModelChange = (currentFormModel: PartialOrganizationDetails) => {
    return !this.currentWizardState.organizationDetailsOption
      || !(_.isEqual(this.currentWizardState.organizationDetailsOption, currentFormModel))
  }

}
