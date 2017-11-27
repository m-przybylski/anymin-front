import {WizardApi} from 'profitelo-api-ng/api/api'
import {GetWizardProfile, MoneyDto, WizardService, WizardTag} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../common/services/user/user.service'
import {ServiceInvitation} from '../../../common/models/ServiceInvitation'
import * as _ from 'lodash'
import {CommonConfig} from '../../../../generated_modules/common-config/common-config'
import {LanguagesService} from '../../../common/services/languages/languages.service'
import {TranslatorService} from '../../../common/services/translator/translator.service'
import {isPlatformForExpert} from '../../../common/constants/platform-for-expert.constant'
import {CommonSettingsService} from '../../../common/services/common-settings/common-settings.service'

export interface IConsultationStateParams extends ng.ui.IStateParamsService {
  service: WizardService
}

interface ILanguagesList {
  name: string,
  value: string
}

export class ConsultationController implements ng.IController {
  public readonly consultationNameMaxLength: string = '350'
  public readonly consultationDescriptionMaxLength: string = '600'
  public isStepRequired: boolean = true
  public currency: string
  public nameInputValue: string
  public tagsInputValue: string[] = []
  public priceAmountInputValue: string = '1,00'
  public invitationsInputValue: string[] = []
  public isOwnerEmployee: boolean = false
  public languagesList: ILanguagesList[]
  public languageInputValue: ILanguagesList
  public descriptionInputValue: string
  public isPlatformForExpert: boolean = isPlatformForExpert
  public isRegExpPriceInputValid: boolean = true
  public isCompany: boolean
  public isSubmitted: boolean = false
  public isPriceAmountValid: boolean = true

  private isExpert: boolean
  private currentEditServiceIndex: number = -1
  private moneyDivider: number
  private defaultLanguageISO: string = ''
  private consultationNamePattern: RegExp = this.CommonSettingsService.localSettings.consultationNamePattern
  private consultationDescriptionPattern: RegExp =
    this.CommonSettingsService.localSettings.consultationDescriptionPattern
  private consultationTagsMinCount: number = this.CommonSettingsService.localSettings.consultationTagsMinCount
  private consultationTagsMaxCount: number = this.CommonSettingsService.localSettings.consultationTagsMaxCount
  private consultationInvitationsMinCount: number =
    this.CommonSettingsService.localSettings.consultationInvitationsMinCount
  private consultationInvitationsMaxCount: number =
    this.CommonSettingsService.localSettings.consultationInvitationsMaxCount
  private consultationPriceMin: number =
    this.CommonSettingsService.localSettings.consultationPriceMin / this.CommonConfig.getAllData().config.moneyDivider
  private consultationPriceMax: number =
    this.CommonSettingsService.localSettings.consultationPriceMax / this.CommonConfig.getAllData().config.moneyDivider

  /* @ngInject */
  constructor(private translatorService: TranslatorService,
              private $state: ng.ui.IStateService,
              private $stateParams: IConsultationStateParams,
              private WizardApi: WizardApi,
              private userService: UserService,
              private CommonConfig: CommonConfig,
              private wizardProfile: GetWizardProfile,
              private languagesService: LanguagesService,
              private CommonSettingsService: CommonSettingsService) {

    this.languagesList = this.languagesService.languagesList

    this.moneyDivider = this.CommonConfig.getAllData().config.moneyDivider

    if (wizardProfile) {
      this.isCompany = wizardProfile.isCompany
      this.isExpert = wizardProfile.isExpert
      if (this.isExpert) {
        this.isOwnerEmployee = true
      }
    }
  }

  $onInit(): void {
    this.checkIsPriceInputValid()

    this.userService.getUser().then((response) => {
      this.currency = response.currency
      this.defaultLanguageISO = response.countryISO

        const language = _.find(this.languagesList, (languageItem) =>
          languageItem.value.toLocaleLowerCase() === this.defaultLanguageISO.toLocaleLowerCase())

        if (language)
          this.languageInputValue = language
    })

    if (this.$stateParams.service) {
      this.nameInputValue = this.$stateParams.service.name
      this.isOwnerEmployee = this.$stateParams.service.isOwnerEmployee
      this.priceAmountInputValue = (this.$stateParams.service.price.amount / this.moneyDivider).toString()
      this.$stateParams.service.tags.forEach((tag) => {
        this.tagsInputValue.push(tag.name)
      })
      this.languageInputValue = {
        name: this.translatorService.translate('LANGUAGE.' + this.$stateParams.service.language),
        value: this.$stateParams.service.language
      }
      this.descriptionInputValue = this.$stateParams.service.description
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
        this.currentEditServiceIndex = _.findIndex(this.wizardProfile.services, (service) =>
          service.name === this.$stateParams.service.name)
    }
  }

  public saveStepsOnExpertPath = (): void => {
    if (this.isExpert && !this.isCompany) {
      this.saveConsultation()
    }
  }

  public saveConsultation = (): void => {
    if (this.checkIsFormValid() && this.wizardProfile) {
      const priceModel: MoneyDto = {
        amount: Number(this.priceAmountInputValue.replace(',', '.')) * this.moneyDivider,
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
        tags,
        invitations,
        language: this.languageInputValue.value,
        description: this.descriptionInputValue,
        name: this.nameInputValue,
        price: priceModel,
        isOwnerEmployee: this.isOwnerEmployee
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
    } else {
      this.isSubmitted = true
    }
  }

  public onGoBack = (): void => {
    this.$state.go('app.wizard.summary')
  }

  public isRegExpPriceValid = (isRegExpPriceValid: boolean): void => {
    this.isRegExpPriceInputValid = isRegExpPriceValid
  }

  public onPriceChange = (ngModel: number): void => {
    const amount = Number(ngModel.toString().replace(',', '.'))
    this.isPriceAmountValid = amount <= this.consultationPriceMax && amount >= this.consultationPriceMin
  }

  public checkIsNameInputValid = (): boolean => this.consultationNamePattern.test(this.nameInputValue)

  public checkIsTagsInputValid = (): boolean => this.tagsInputValue
    && this.tagsInputValue.length >= this.consultationTagsMinCount
    && this.tagsInputValue.length <= this.consultationTagsMaxCount

  public checkIsDescriptionInputValid = (): boolean =>
    this.consultationDescriptionPattern.test(this.descriptionInputValue)

  public checkIsEmployeesInputValid = (): boolean =>
    this.isOwnerEmployee && this.invitationsInputValue.length <= this.consultationInvitationsMaxCount
    || this.invitationsInputValue.length >= this.consultationInvitationsMinCount
        && this.invitationsInputValue.length <= this.consultationInvitationsMaxCount

  public checkIsFormValid = (): boolean =>
    this.checkIsNameInputValid()
    && this.checkIsTagsInputValid()
    && this.checkIsPriceInputValid()
    && this.checkIsEmployeesInputValid()
    && this.checkIsDescriptionInputValid()

  public checkIsPriceButtonDisabled = (): boolean => !this.isCompany || this.checkIsPriceInputValid()

  public checkIsPriceInputValid = (): boolean => this.isPriceAmountValid && this.isRegExpPriceInputValid

}
