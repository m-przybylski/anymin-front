import {CommonSettingsService} from '../../../common/services/common-settings/common-settings.service'
import {WizardApi} from 'profitelo-api-ng/api/api'
import * as angular from 'angular'
import {GetWizardProfile, MoneyDto, PutWizardProfile, WizardService, WizardTag} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../common/services/user/user.service'
export class ConsultationController implements ng.IController {
  public consultationsMock: string[]
  public numberRegexp: RegExp
  public currency: string
  public nameModel: string
  public tagsModel: string[] = []
  public priceAmountModel: number
  public employeesModel?: string[]
  public isOwnerEmployee: boolean = false

  public isCompany: boolean
  private isExpert: boolean
  private currentWizardState?: PutWizardProfile
  /* @ngInject */
  constructor(CommonSettingsService: CommonSettingsService, private $state: ng.ui.IStateService,
              private WizardApi: WizardApi, private userService: UserService, private wizardProfile?: GetWizardProfile) {
    if (wizardProfile) {
      this.currentWizardState = angular.copy(this.wizardProfile)
      this.isCompany = wizardProfile.isCompany
      this.isExpert = wizardProfile.isExpert
      if (this.isExpert) {
        this.isOwnerEmployee = true
      }

    }

    this.numberRegexp = CommonSettingsService.localSettings.numberPattern
    this.consultationsMock = [
      'Polski tag',
      'Angielski tag',
      'Rosyjski'
    ]
  }

  $onInit() {
    this.userService.getUser().then((response) => {
      this.currency = response.currency
    })
  }

  public saveStepsOnExpertPath = () => {
    if (this.isExpert) {
      this.saveConsultation()
    }
  }

  public saveConsultation = () => {
    if (this.checkIsFormValid && this.currentWizardState) {
      const priceModel: MoneyDto = {
        amount: Number(this.priceAmountModel),
        currency: this.currency
      }
      const tags: WizardTag[] = []
      this.tagsModel.forEach((tag) => {
        tags.push({
          name: tag
        })
      })
      const serviceModel: WizardService = {
        name: this.nameModel,
        price: priceModel,
        tags: tags,
        isOwnerEmployee: this.isOwnerEmployee,
        invitations: this.employeesModel
      }

      if (this.currentWizardState.services) {
        this.currentWizardState.services.push(serviceModel)
      } else {
        this.currentWizardState.services = [serviceModel]
      }

      this.WizardApi.putWizardProfileRoute(this.currentWizardState).then(() => {
        this.$state.go('app.wizard.summary')
      })
    }
  }

  public onGoBack = (): void => {
    this.$state.go('app.wizard.summary')
  }

  public checkIsNameInputValid = (): boolean => {
    return !!(this.nameModel && this.nameModel.length > 4)
  }

  public checkIsTagsInputValid = (): boolean => {
    return this.tagsModel && this.tagsModel.length > 0
  }

  public checkIsPriceInputValid = (): boolean => {
    return !!(this.priceAmountModel && this.priceAmountModel > 0)
  }

  public checkIsEmployeesInputValid = (): boolean => {
    return this.employeesModel && this.employeesModel.length > 0 || this.isOwnerEmployee
  }

  public checkIsFormValid = (): boolean => {
    return !!(this.checkIsNameInputValid && this.checkIsTagsInputValid
    && this.checkIsPriceInputValid && this.checkIsEmployeesInputValid)
  }

}
