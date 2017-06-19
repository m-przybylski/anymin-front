import {GetWizardProfile, PartialExpertDetails, WizardService, PartialOrganizationDetails} from 'profitelo-api-ng/model/models'
import {WizardApi} from 'profitelo-api-ng/api/api'
import * as _ from 'lodash'

export class SummaryController implements ng.IController {

  public wizardProfileType: boolean
  public wizardProfileData?: PartialExpertDetails | PartialOrganizationDetails
  public isConsultation: boolean = false
  public services?: WizardService[]
  public isUserShouldCreateExpert: boolean = false
  public isCompanyWithExpert: boolean = false
  public wizardExpertProfileData?: PartialExpertDetails

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService, private WizardApi: WizardApi, private wizardProfile?: GetWizardProfile) {

    if (wizardProfile) {
      if (wizardProfile.expertDetailsOption && wizardProfile.isExpert && !wizardProfile.isCompany) {
        this.wizardProfileType = wizardProfile.isExpert
        this.wizardProfileData = wizardProfile.expertDetailsOption
      } else if (wizardProfile.organizationDetailsOption && wizardProfile.isCompany) {
        this.wizardProfileType = false
        this.wizardProfileData = wizardProfile.organizationDetailsOption
        this.wizardExpertProfileData = wizardProfile.expertDetailsOption
        if (wizardProfile.services) {
          this.isUserShouldCreateExpert = this.checkIsUserShoudlCreateExpertProfile()
          this.isCompanyWithExpert = wizardProfile.isCompany && wizardProfile.isExpert
        }
      }
    } else {
      $state.go('app.wizard.create-profile')
    }

  }

  $onInit() {
    if (this.wizardProfile) {
      this.isConsultation = !!(this.wizardProfile.services
      && this.wizardProfile.services.length > 0)
      this.services = this.wizardProfile.services
    }
  }

  public onMainProfileDelete = () => {
    this.WizardApi.putWizardProfileRoute({
      isSummary: false,
      isCompany: false,
      isExpert: false
    }).then(() => {
      this.$state.go('app.wizard.create-profile')
    }, (error) => {
      throw new Error(error)
    })
  }

  public onSecondProfileDelete = () => {
    if (this.wizardProfile) {
      this.wizardProfile.expertDetailsOption = void 0
      this.wizardProfile.isExpert = false
      this.WizardApi.putWizardProfileRoute(this.wizardProfile).then((response: any) => {
        this.isUserShouldCreateExpert = true
        this.isCompanyWithExpert = response.isCompany && response.isExpert
        this.wizardExpertProfileData = response.expertDetailsOption
      }, (error) => {
        throw new Error(error)
      })
    }
  }

  public onMainProfileEdit = () => {
    if (this.wizardProfile && this.wizardProfile.isExpert && !this.wizardProfile.isCompany) {
      this.$state.go('app.wizard.create-profile.expert')
    } else {
      this.$state.go('app.wizard.create-profile.company')
    }
  }

  public onSecondProfileEdit = () => {
    this.$state.go('app.wizard.create-profile.expert')
  }

  public removeConsultation = (serviceToDelete: WizardService) => {
    if (this.wizardProfile && this.services) {
      _.remove(this.services, (service) => serviceToDelete === service)
      this.wizardProfile.services = this.services

      this.WizardApi.putWizardProfileRoute(this.wizardProfile).then((response: any) => {
        this.isConsultation = response.services && response.services.length > 0
        this.isUserShouldCreateExpert = this.checkIsUserShoudlCreateExpertProfile()
      })
    }
  }

  public editConsultation = (service: WizardService) => {
    this.$state.go('app.wizard.consultation', {
      service: service
    })
  }

  public saveWizard = () => {
    this.WizardApi.postWizardCompleteRoute().then((_response) => {
      this.$state.go('app.dashboard.expert.activities')
    }, (error) => {
      throw new Error(error)
    })
  }

  private checkIsUserShoudlCreateExpertProfile = () => {
    if (this.wizardProfile && this.wizardProfile.services) {
      return !!(_.find(this.wizardProfile.services, (service) => {
        return !!service.isOwnerEmployee
      }) && !this.wizardProfile.isExpert)
    }
    return false
  }

}
