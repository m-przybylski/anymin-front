import {PutWizardProfile, PartialOrganizationDetails} from 'profitelo-api-ng/model/models'
import {WizardApi} from 'profitelo-api-ng/api/api'

import * as _ from 'lodash'
import * as angular from 'angular'

export class CompanyController implements ng.IController {
  public currentWizardState: PutWizardProfile

  public nameModel?: string = ''
  public logoModel?: string
  public descriptionModel?: string = ''
  public filesModel?: Array<string> = []
  public linksModel?: Array<string> = []
  public dictionary: {
    [key: string]: string
  }
  /* @ngInject */
  constructor(private WizardApi: WizardApi, private wizardProfile: PutWizardProfile) {
  }

  $onInit = () => {
    if (this.wizardProfile) {
      this.currentWizardState = angular.copy(this.wizardProfile)
      this.currentWizardState.isExpert = false
      this.currentWizardState.isCompany = true

      if (this.wizardProfile.organizationDetailsOption) {
        this.nameModel = this.wizardProfile.organizationDetailsOption.name
        this.logoModel = this.wizardProfile.organizationDetailsOption.logo
        this.filesModel = this.wizardProfile.organizationDetailsOption.files
        this.descriptionModel = this.wizardProfile.organizationDetailsOption.description
        this.linksModel = this.wizardProfile.organizationDetailsOption.links
      }
    } else {
      this.currentWizardState = {
        isExpert: false,
        isCompany: true,
        isSummary: false
      }
    }

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
      this.currentWizardState.organizationDetailsOption = wizardOrganizationModel
      this.WizardApi.putWizardProfileRoute(this.currentWizardState).then((_response) => {
      }, (error) => {
        throw new Error('Can not save profile steps' + error)
      })
    }
  }

}
