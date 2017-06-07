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
  /* @ngInject */
  constructor(private WizardApi: WizardApi, private $state: ng.ui.IStateService,
              private wizardProfile?: GetWizardProfile) {
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
    this.currentWizardState.isExpert = false
    this.currentWizardState.isCompany = true
    this.WizardApi.putWizardProfileRoute(this.currentWizardState).then((_response) => {
    }, (error) => {
      throw new Error('Can not save ' + error)
    })

  }

  public saveSteps = () => {
    const wizardOrganizationModel: PartialOrganizationDetails = {
      name: this.nameModel,
      logo: this.logoModel,
      description: this.descriptionModel,
      files: this.filesModel,
      links: this.linksModel
    }

    if (!this.currentWizardState.organizationDetailsOption
      || !(_.isEqual(this.currentWizardState.organizationDetailsOption, wizardOrganizationModel))) {
      this.currentWizardState.organizationDetailsOption = angular.copy(wizardOrganizationModel)
      this.WizardApi.putWizardProfileRoute(this.currentWizardState).then((_response) => {
      }, (error) => {
        throw new Error('Can not save profile steps' + error)
      })
    }
  }

  public goToSummary = () => {
    if (this.checkIsFormValid()) {
      this.$state.go('app.wizard.summary')
    } else {
      this.isSubmitted = true
    }
  }

  public checkNameInput = () => {
    return this.nameModel && this.nameModel.length > 2
  }

  public checkLogo = () => {
    return this.logoModel && this.logoModel.length > 0
  }

  public checkProfileDescription = () => {
    return this.descriptionModel && this.descriptionModel.length > 49
  }

  public checkIsFormValid = (): boolean => {
    return !!(this.currentWizardState.expertDetailsOption
    && this.checkNameInput()
    && this.checkLogo()
    && this.checkProfileDescription())
  }
}
