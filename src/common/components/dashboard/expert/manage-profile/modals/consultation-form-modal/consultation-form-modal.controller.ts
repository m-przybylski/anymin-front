import {IFilterService} from '../../../../../../services/filter/filter.service'
import {CommonConfig} from '../../../../../../../../generated_modules/common-config/common-config'
import {CommonSettingsService} from '../../../../../../services/common-settings/common-settings.service'
import {UserService} from '../../../../../../services/user/user.service'
import * as _ from 'lodash'
import {ServiceInvitation} from '../../../../../../models/ServiceInvitation'
import {MoneyDto, PostService, PostServiceTag, GetExpertServiceDetails, GetInvitation,
  GetProfileDetailsWithEmployments, GetServiceWithInvitations}
  from 'profitelo-api-ng/model/models'
import {ServiceApi, EmploymentApi} from 'profitelo-api-ng/api/api'
import {ErrorHandlerService} from '../../../../../../services/error-handler/error-handler.service'
import {LanguagesService} from '../../../../../../services/languages/languages.service'

interface ILanguage {
  name: string,
  value: string
}

export interface IConsultationFormModalScope extends ng.IScope {
  onModalCloseCallback: () => void
  serviceDetails?: GetExpertServiceDetails
}

export class ConsultationFormModalController implements ng.IController {

  public readonly consultationNameMaxLength: string = '150'
  public readonly consultationDescriptionMaxLength: string = '600'
  public isLoading: boolean = true
  public isError: boolean = false
  public consultationName: string = ''
  public languagesList: ILanguage[] = []
  public consultationLanguage?: ILanguage
  public consultationTags: string[] = []
  public consultationDescription: string = ''
  public recommendedTags: string[] = []
  public consultationNewInvitations: string[] = []
  public isOwnerEmployee: boolean = false
  public consultationPrice: string = '1.00'
  public isSubmitted: boolean = false
  public isRegExpPriceInputValid: boolean = true
  public isCompany: boolean = false
  public isExpert: boolean = false

  private static readonly minValidNameLength: number = 5
  private static readonly minValidDescriptionLength: number = 50
  private moneyDivider: number
  private currency: string
  private priceRegexp: RegExp
  private defaultLanguageISO: string = ''
  private onModalCloseCallback: () => void
  private serviceDetails?: GetExpertServiceDetails

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private $filter: IFilterService,
              private CommonConfig: CommonConfig,
              private CommonSettingsService: CommonSettingsService,
              private userService: UserService,
              private ServiceApi: ServiceApi,
              private $scope: IConsultationFormModalScope,
              private errorHandler: ErrorHandlerService,
              private languages: LanguagesService,
              private EmploymentApi: EmploymentApi,
              private $q: ng.IQService) {

    this.languagesList = this.languages.languagesList

    this.moneyDivider = this.CommonConfig.getAllData().config.moneyDivider

  }

  $onInit(): void {
    this.recommendedTags = [
      'Tag-1',
      'Tag-2',
      'Tag-3'
    ]

    this.priceRegexp = this.CommonSettingsService.localSettings.pricePattern

    this.userService.getUser().then((user) => {
      this.isCompany = user.isCompany
      this.isExpert = user.isExpert
      this.currency = user.currency
      this.defaultLanguageISO = user.countryISO
      this.consultationLanguage = _.find(this.languagesList, (languageItem) =>
        languageItem.value.toLocaleLowerCase() === this.defaultLanguageISO.toLocaleLowerCase())

      if (this.$scope.serviceDetails) {
        this.serviceDetails = this.$scope.serviceDetails
        this.consultationName = this.serviceDetails.service.name
        this.consultationLanguage = {
          name: (this.$filter('translate')
          (this.$filter('normalizeTranslationKey')(('LANGUAGE.' + this.serviceDetails.service.language)))),
          value: this.serviceDetails.service.language
        }
        this.consultationDescription = this.serviceDetails.service.description
        this.consultationPrice = (this.serviceDetails.service.price.amount / this.moneyDivider).toString()
        this.serviceDetails.tags.forEach((tag) => {
          this.consultationTags.push(tag.name)
        })
        this.getDataFromBackend(this.serviceDetails.service.id)
      }
    })
    this.onModalCloseCallback = this.$scope.onModalCloseCallback
    this.isLoading = false
  }

  private getDataFromBackend = (serviceId: string): void => {
    this.isLoading = true
    this.$q.all([
      this.ServiceApi.postServiceInvitationsRoute({serviceIds: [serviceId]}),
      this.EmploymentApi.getEmployeesRoute()
    ]).then((results) => {
      this.onGetServiceInvitations(results[0])
      this.onGetEmployments(results[1])
    }).catch(() => {
      this.isError = true
    }).finally(() => {
      this.isLoading = false
    })
  }

  public saveConsultation = (): void => {
   if (this.isFormValid()) {
     if (this.serviceDetails) {
       this.ServiceApi.putServiceRoute(this.serviceDetails.service.id, this.createServiceModel()).then(() => {
         this.onModalCloseCallback()
         this.onModalClose()
       }, this.onReject)
     } else {
       this.ServiceApi.postServiceRoute(this.createServiceModel()).then(() => {
         this.onModalCloseCallback()
         this.onModalClose()
       }, this.onReject)
     }
   } else {
     this.isSubmitted = true
   }
  }

  public onPriceChange = (consultationCostInputValue: string): void => {
    const consultationCost = Number(consultationCostInputValue.replace(',', '.'))
    this.isRegExpPriceInputValid = this.isRegExpPriceValid(consultationCost)
  }

  public isNameValid = (): boolean => this.consultationName.length >= ConsultationFormModalController.minValidNameLength

  public areTagsValid = (): boolean => this.consultationTags && this.consultationTags.length > 0

  public isLanguageValid = (): boolean => this.consultationLanguage !== undefined
    && this.consultationLanguage.name.length > 0

  public isDescriptionValid = (): boolean =>
    this.consultationDescription.length >= ConsultationFormModalController.minValidDescriptionLength

  public areInvitationsValid = (): boolean =>
    !this.serviceDetails ? this.consultationNewInvitations.length > 0 || this.isOwnerEmployee : true

  public isPriceValid = (): boolean => this.consultationPrice.length > 0

  public isFormValid = (): boolean =>
    this.isNameValid()
    && this.areTagsValid()
    && this.isLanguageValid()
    && this.isDescriptionValid()
    && this.areInvitationsValid()
    && this.isPriceValid()

  public onModalClose = (): void => this.$uibModalInstance.dismiss('cancel')

  private createServiceModel = (): PostService => {
    const priceModel: MoneyDto = {
      // TODO: refactor after https://git.contactis.pl/itelo/profitelo-frontend/issues/101
      amount: Number(this.consultationPrice.replace(',', '.')) * this.moneyDivider,
      currency: this.currency
    }
    const tags: PostServiceTag[] = []
    this.consultationTags.forEach((tag) => {
      tags.push({
        name: tag
      })
    })
    const invitations: ServiceInvitation[] = []
    this.consultationNewInvitations.forEach((emailOrPhone) => {
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
    let language: string = ''
    if (this.consultationLanguage)
      language = this.consultationLanguage.value
    return {
      tags,
      invitations,
      language,
      description: this.consultationDescription,
      name: this.consultationName,
      price: priceModel,
      isOwnerEmployee: this.isOwnerEmployee
    }
  }

  private onGetServiceInvitations = (servicesWithInvitations: GetServiceWithInvitations[]): void => {
    const emailInvitation: string[] = _.flatMap(servicesWithInvitations, singleService =>
      singleService.invitations
        .filter(invitation => invitation.status === GetInvitation.StatusEnum.NEW)
        .filter(invitation => invitation.email)
        .map(emailInvitation => emailInvitation.email!)
    )
    const msisdnInvitation: string[] = _.flatMap(servicesWithInvitations, singleService =>
      singleService.invitations
        .filter(invitation => invitation.status === GetInvitation.StatusEnum.NEW)
        .filter(invitation => invitation.msisdn)
        .map(msisndInvitation => msisndInvitation.msisdn!)
    )
    this.consultationNewInvitations = emailInvitation.concat(msisdnInvitation)
  }

  private onGetEmployments = (employments: GetProfileDetailsWithEmployments[]): void => {
    const serviceOwnerEmployments = _.find(employments, (employment) =>
      this.serviceDetails && employment.expertProfile.id === this.serviceDetails.ownerProfile.id
    )
    if (serviceOwnerEmployments)
      this.isOwnerEmployee = _.find(serviceOwnerEmployments.employments, (employment) =>
        (this.serviceDetails && this.serviceDetails.service.id === employment.serviceId)) !== undefined
  }

  private onReject = (error: any): void => {
    this.errorHandler.handleServerError(error, 'Can not save consultation',
      'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.MODAL.SAVE_ERROR_MESSAGE')
  }

  private isRegExpPriceValid = (priceValue: number): boolean =>
    (priceValue && this.priceRegexp.test(priceValue.toString())) || priceValue > 0
}
