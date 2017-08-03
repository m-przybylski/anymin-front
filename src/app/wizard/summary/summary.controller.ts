import {
  GetWizardProfile,
  PartialExpertDetails,
  WizardService,
  PartialOrganizationDetails
} from 'profitelo-api-ng/model/models'
import {WizardApi} from 'profitelo-api-ng/api/api'
import * as _ from 'lodash'
import {ErrorHandlerService} from '../../../common/services/error-handler/error-handler.service'
import {UserService} from '../../../common/services/user/user.service'

export class SummaryController implements ng.IController {

  public isExpertWizardPath: boolean
  public wizardProfileData?: PartialExpertDetails | PartialOrganizationDetails
  public isConsultation: boolean = false
  public services?: WizardService[]
  public isUserShouldCreateExpert: boolean = false
  public isCompanyWithExpert: boolean = false
  public wizardExpertProfileData?: PartialExpertDetails
  public isWizardInvalid: boolean = false

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService, private errorHandler: ErrorHandlerService,
              private WizardApi: WizardApi, private wizardProfile: GetWizardProfile,
              private userService: UserService) {

    if (wizardProfile.expertDetailsOption && wizardProfile.isExpert && !wizardProfile.isCompany) {
      this.isExpertWizardPath = wizardProfile.isExpert
      this.wizardProfileData = wizardProfile.expertDetailsOption
    } else if (wizardProfile.organizationDetailsOption && wizardProfile.isCompany) {
      this.isExpertWizardPath = false
      this.wizardProfileData = wizardProfile.organizationDetailsOption
      this.wizardExpertProfileData = wizardProfile.expertDetailsOption
      if (wizardProfile.services) {
        this.isUserShouldCreateExpert = this.checkIfUserCanCreateExpertProfile()
        this.isCompanyWithExpert = wizardProfile.isCompany && wizardProfile.isExpert
      }
    }

  }

  $onInit(): void {
      this.isConsultation = !!(this.wizardProfile.services
      && this.wizardProfile.services.length > 0)
      this.services = this.wizardProfile.services
  }

  public onMainProfileDelete = (): void => {
    this.WizardApi.putWizardProfileRoute({
      isSummary: false,
      isCompany: false,
      isExpert: false
    }).then(() => {
      this.$state.go('app.wizard.create-profile')
    }, (error) => {
      this.errorHandler.handleServerError(error)
    })
  }

  public onSecondProfileDelete = (): void => {
    if (this.wizardProfile) {
      this.wizardProfile.expertDetailsOption = void 0
      this.wizardProfile.isExpert = false
      this.WizardApi.putWizardProfileRoute(this.wizardProfile).then((response) => {
        this.isUserShouldCreateExpert = true
        this.isCompanyWithExpert = response.isCompany && response.isExpert
        this.wizardExpertProfileData = response.expertDetailsOption
      }, (error) => {
        this.errorHandler.handleServerError(error)
      })
    }
  }

  public onMainProfileEdit = (): void => {
    if (this.wizardProfile && this.wizardProfile.isExpert && !this.wizardProfile.isCompany) {
      this.$state.go('app.wizard.create-profile.expert')
    } else {
      this.$state.go('app.wizard.create-profile.company')
    }
  }

  public onSecondProfileEdit = (): void => {
    this.$state.go('app.wizard.create-profile.expert')
  }

  public removeConsultation = (serviceToDelete: WizardService): void => {
    if (this.wizardProfile && this.services) {
      _.remove(this.services, (service) => serviceToDelete === service)
      this.wizardProfile.services = this.services
      this.WizardApi.putWizardProfileRoute(this.wizardProfile).then((response) => {
        this.isConsultation = !!(response.services && response.services.length > 0)
        this.isUserShouldCreateExpert = this.checkIfUserCanCreateExpertProfile()
      })
    }
  }

  public editConsultation = (service: WizardService): void => {
    this.$state.go('app.wizard.consultation', {
      service
    })
  }

  public saveWizard = (): void => {
    if (this.checkIsWizardValid()) {
      this.WizardApi.postWizardCompleteRoute().then((_response) => {
        this.userService.getUser(true).then(() => {
          this.$state.go('app.dashboard.expert.activities')
        })
      }, (error) => {
        this.errorHandler.handleServerError(error)
      })
    } else {
      this.isWizardInvalid = true
    }
  }

  private checkIsWizardValid = (): boolean => {
    if (this.wizardProfile.isSummary && this.checkIsWizardHasService()) {
      if (!this.wizardProfile.isCompany && this.checkIsExpertProfileValid()) {
        return true
      } else if (!this.wizardProfile.isExpert && this.checkIsCompanyProfileValid()) {
        return true
      } else if (this.wizardProfile.isCompany && this.wizardProfile.isExpert && this.checkIsExpertProfileValid() &&
        this.checkIsCompanyProfileValid()) {
        return true
      }
      return false
    }

    return false
  }

  private checkIsExpertProfileValid = (): string | boolean | undefined => {
    return this.wizardProfile.isExpert && this.wizardProfile.expertDetailsOption
      && this.wizardProfile.expertDetailsOption.avatar && this.wizardProfile.expertDetailsOption.description
      && this.wizardProfile.expertDetailsOption.languages && this.wizardProfile.expertDetailsOption.name
  }

  private checkIsWizardHasService = (): boolean | undefined => {
    return this.wizardProfile.services && this.wizardProfile.services.length > 0
  }

  private checkIsCompanyProfileValid = (): string | boolean | undefined => {
    return this.wizardProfile.isCompany && this.wizardProfile.organizationDetailsOption
      && this.wizardProfile.organizationDetailsOption.name && this.wizardProfile.organizationDetailsOption.logo
      && this.wizardProfile.organizationDetailsOption.description
  }

  private checkIfUserCanCreateExpertProfile = (): boolean => {
    if (this.wizardProfile && this.wizardProfile.services) {
      return !!(_.find(this.wizardProfile.services, (service) => {
        return service.isOwnerEmployee
      }) && !this.wizardProfile.isExpert)
    }
    return false
  }

}
