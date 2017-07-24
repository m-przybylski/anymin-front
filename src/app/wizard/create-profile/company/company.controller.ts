import {PutWizardProfile, PartialOrganizationDetails, GetWizardProfile} from 'profitelo-api-ng/model/models'
import {WizardApi} from 'profitelo-api-ng/api/api'

import * as _ from 'lodash'
import * as angular from 'angular'
import {IPromise} from 'angular'

export class CompanyController implements ng.IController {
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

  /* @ngInject */
  constructor(private WizardApi: WizardApi, private $state: ng.ui.IStateService,
              private wizardProfile?: GetWizardProfile) {
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

  public checkIsNameInputValid = (): boolean | '' | undefined => {
    return this.nameModel && this.nameModel.length > 2
  }

  public checkIsLogoValid = (): boolean | '' | undefined => {
    return this.logoModel && this.logoModel.length > 0
  }

  public checkIsProfileDescriptionValid = (): boolean| '' | undefined => {
    return this.descriptionModel && this.descriptionModel.length > 49
  }

  public checkIsFileUploadValid = (): boolean => {
    return this.isUploading
  }

  public onUploadingFile = (status: boolean): void => {
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

  private saveWizardState = (wizardState: PutWizardProfile): IPromise<GetWizardProfile> => {
    return this.WizardApi.putWizardProfileRoute(wizardState)
    .catch((error) => {
      throw new Error('Can not save profile steps' + error)
    })
  }

  private checkIsAnyStepModelChange = (currentFormModel: PartialOrganizationDetails): boolean => {
    return !this.currentWizardState.organizationDetailsOption
      || !(_.isEqual(this.currentWizardState.organizationDetailsOption, currentFormModel))
  }

}
