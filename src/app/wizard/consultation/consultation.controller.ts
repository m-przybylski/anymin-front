import {CommonSettingsService} from '../../../common/services/common-settings/common-settings.service'
import {WizardApi} from 'profitelo-api-ng/api/api'
import {GetWizardProfile, MoneyDto, WizardService, WizardTag} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../common/services/user/user.service'
import {ServiceInvitation} from '../../../common/models/ServiceInvitation'
import * as _ from 'lodash'

export interface IConsultationStateParams extends ng.ui.IStateParamsService {
  service: WizardService
}

export class ConsultationController implements ng.IController {
  public consultationsMock: string[]
  public numberRegexp: RegExp
  public currency: string
  public nameInputValue: string
  public tagsInputValue: string[] = []
  public priceAmountInputValue: number
  public invitationsInputValue: string[] = []
  public isOwnerEmployee: boolean = false

  public isCompany: boolean
  private isExpert: boolean
  private currentEditServiceIndex: number = -1
  private readonly moneyDivider: number = 100

  /* @ngInject */
  constructor(CommonSettingsService: CommonSettingsService, private $state: ng.ui.IStateService,
              private $stateParams: IConsultationStateParams, private WizardApi: WizardApi,
              private userService: UserService, private wizardProfile?: GetWizardProfile) {

    if (wizardProfile) {

      this.isCompany = wizardProfile.isCompany
      this.isExpert = wizardProfile.isExpert
      if (this.isExpert) {
        this.isOwnerEmployee = true
      }
    }

    this.numberRegexp = CommonSettingsService.localSettings.numberPattern
    this.consultationsMock = [
      'Tag-1',
      'Tag-2',
      'Tag-3'
    ]
  }

  $onInit() {
    this.userService.getUser().then((response) => {
      this.currency = response.currency
    })

    if (this.$stateParams.service) {
      this.nameInputValue = this.$stateParams.service.name
      this.isOwnerEmployee = this.$stateParams.service.isOwnerEmployee
      this.priceAmountInputValue = this.$stateParams.service.price.amount / this.moneyDivider
      this.$stateParams.service.tags.forEach((tag) => {
        this.tagsInputValue.push(tag.name)
      })
      if (this.$stateParams.service.invitations) {
        this.$stateParams.service.invitations.forEach((employee) => {
          if (employee.email) {
            this.invitationsInputValue.push(employee.email)
          } else if (employee.msisdn) {
            this.invitationsInputValue.push(employee.msisdn)
          }
        })
      }
      if (this.wizardProfile && this.wizardProfile.services)
        this.currentEditServiceIndex = _.findIndex(this.wizardProfile.services, (service) => {
          return service.name === this.$stateParams.service.name
        })
    }
  }

  public saveStepsOnExpertPath = () => {
    if (this.isExpert && !this.isCompany) {
      this.saveConsultation()
    }
  }

  public saveConsultation = () => {
    if (this.checkIsFormValid() && this.wizardProfile) {
      const priceModel: MoneyDto = {
        amount: Number(this.priceAmountInputValue) * this.moneyDivider,
        currency: this.currency
      }
      const tags: WizardTag[] = []
      this.tagsInputValue.forEach((tag) => {
        tags.push({
          name: tag
        })
      })

      const invitations: ServiceInvitation[] = []
      this.invitationsInputValue.forEach((emailOrPhone) => {
        if (emailOrPhone.indexOf('@') > -1) {
          invitations.push({
            email: emailOrPhone
          })
        } else {
          invitations.push({
            msisdn: emailOrPhone
          })
        }
      })
      const serviceModel: WizardService = {
        name: this.nameInputValue,
        price: priceModel,
        tags: tags,
        isOwnerEmployee: this.isOwnerEmployee,
        invitations: invitations
      }
      if (this.wizardProfile.services && !this.$stateParams.service) {
        this.wizardProfile.services.push(serviceModel)
      } else if (this.wizardProfile.services && this.wizardProfile.services.length < 1) {
        this.wizardProfile.services = [serviceModel]
      } else if (this.wizardProfile.services && this.$stateParams.service && this.currentEditServiceIndex > -1) {
        this.wizardProfile.services[this.currentEditServiceIndex] = serviceModel
      }
      this.WizardApi.putWizardProfileRoute(this.wizardProfile).then(() => {
        this.$state.go('app.wizard.summary')
      })
    }
  }

  public onGoBack = (): void => {
    this.$state.go('app.wizard.summary')
  }

  public checkIsNameInputValid = (): boolean => {
    return !!(this.nameInputValue && this.nameInputValue.length > 4)
  }

  public checkIsTagsInputValid = (): boolean => {
    return this.tagsInputValue && this.tagsInputValue.length > 0
  }

  public checkIsPriceInputValid = (): boolean => {
    return !!(this.priceAmountInputValue && this.priceAmountInputValue > 0)
  }

  public checkIsEmployeesInputValid = (): boolean => {
    return this.invitationsInputValue && this.invitationsInputValue.length > 0 || this.isOwnerEmployee
  }

  public checkIsFormValid = (): boolean => {
    return !!(this.checkIsNameInputValid && this.checkIsTagsInputValid
    && this.checkIsPriceInputValid && this.checkIsEmployeesInputValid)
  }

}
