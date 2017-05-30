import {WizardApi} from 'profitelo-api-ng/api/api'
import {PutWizardProfile} from 'profitelo-api-ng/model/models'
import * as angular from 'angular'

export class ExpertController implements ng.IController {
  public inputText: string = ''
  public inputMaxLength: number = 150

  public currentWizardState: PutWizardProfile
  // Models:
  public nameModel: string = ''

  /* @ngInject */
  constructor(private WizardApi: WizardApi) {
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
    this.WizardApi.putWizardProfileRoute(this.currentWizardState).then((_response) => {
    }, (error) => {
      throw new Error('Can not save profile steps' + error)
    })
  }

  // Validations Methods:
  public checkNameInput = () => {
    return this.currentWizardState.expertDetailsOption && this.currentWizardState.expertDetailsOption.name &&
      this.currentWizardState.expertDetailsOption.name.length > 2
  }

}
