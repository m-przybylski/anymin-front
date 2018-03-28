// tslint:disable:member-ordering
// tslint:disable:max-file-line-count
import { CommonConfig } from '../../../../../../../../../generated_modules/common-config/common-config';
import { UserService } from '../../../../../../services/user/user.service';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { IServiceInvitation } from '../../../../../../models/ServiceInvitation';
import {
  MoneyDto, PostService, PostServiceTag, GetExpertServiceDetails, GetInvitation,
  GetProfileDetailsWithEmployments, GetServiceWithInvitations
}
  from 'profitelo-api-ng/model/models';
import { ServiceApi, EmploymentApi } from 'profitelo-api-ng/api/api';
import { ErrorHandlerService } from '../../../../../../services/error-handler/error-handler.service';
import { ILanguage, LanguagesService } from '../../../../../../services/languages/languages.service';
import { TranslatorService } from '../../../../../../services/translator/translator.service';
import { CommonSettingsService } from '../../../../../../services/common-settings/common-settings.service';
import { Config } from '../../../../../../../../config';

export interface IServiceFormModalScope extends ng.IScope {
  onModalCloseCallback: () => void;
  serviceDetails?: GetExpertServiceDetails;
}

// tslint:disable:member-ordering
export class ServiceFormModalController implements ng.IController {

  public readonly consultationNameMaxLength = Config.inputsMaxLength.consultationName;
  public readonly consultationDescriptionMaxLength = Config.inputsMaxLength.consultationDescription;
  public isLoading = true;
  public isError = false;
  public consultationName = '';
  public languagesList: ILanguage[] = [];
  public consultationLanguage?: ILanguage;
  public consultationTags: string[] = [];
  public consultationDescription = '';
  public recommendedTags: string[] = [];
  public consultationNewInvitations: string[] = [];
  public isOwnerEmployee = false;
  public consultationPrice = '1.00';
  public isSubmitted = false;
  public isRegExpPriceInputValid = true;
  public isCompany = false;
  public isExpert = false;
  public isFreelance = false;
  public isPlatformForExpert = Config.isPlatformForExpert;
  public isPriceAmountValid = true;

  private moneyDivider: number;
  private currency: string;
  private defaultLanguageISO = '';
  private onModalCloseCallback: () => void;
  private serviceDetails?: GetExpertServiceDetails;
  private consultationNamePattern: RegExp;
  private consultationDescriptionPattern: RegExp;
  private consultationTagsMinCount: number;
  private consultationTagsMaxCount: number;
  private consultationInvitationsMinCount: number;
  private consultationInvitationsMaxCount: number;
  private consultationPriceMin: number;
  private consultationPriceMax: number;
  private static readonly defaultConsultationLanguage: ILanguage = {
    name: 'Polish',
    value: 'pl'
  };

  public static $inject = ['$uibModalInstance', 'translatorService', 'CommonConfig', 'userService', 'ServiceApi',
    '$scope', 'errorHandler', 'languagesService', 'EmploymentApi', '$q', 'CommonSettingsService'];

  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private translatorService: TranslatorService,
              private CommonConfig: CommonConfig,
              private userService: UserService,
              private ServiceApi: ServiceApi,
              private $scope: IServiceFormModalScope,
              private errorHandler: ErrorHandlerService,
              private languagesService: LanguagesService,
              private EmploymentApi: EmploymentApi,
              private $q: ng.IQService,
              private CommonSettingsService: CommonSettingsService) {

    this.languagesList = this.languagesService.languagesList;

    this.moneyDivider = this.CommonConfig.getAllData().config.moneyDivider;

    this.assignValidationValues();
  }

  public $onInit(): void {
    this.userService.getUser().then((user) => {
      this.isCompany = user.isCompany;
      this.isExpert = user.isExpert;
      this.currency = user.currency;
      this.defaultLanguageISO = user.countryISO;
      const language = _.find(this.languagesList, (languageItem) =>
        languageItem.value.toLocaleLowerCase() === this.defaultLanguageISO.toLocaleLowerCase());
      language ? this.consultationLanguage = language :
        this.consultationLanguage = ServiceFormModalController.defaultConsultationLanguage;

      if (this.$scope.serviceDetails) {
        this.serviceDetails = this.$scope.serviceDetails;
        this.consultationName = this.serviceDetails.service.name;
        this.isFreelance = this.$scope.serviceDetails.service.isFreelance;
        this.consultationLanguage = {
          name: this.translatorService.translate('LANGUAGE.' + this.serviceDetails.service.language),
          value: this.serviceDetails.service.language
        };
        this.consultationDescription = this.serviceDetails.service.description;
        this.consultationPrice = (this.serviceDetails.service.price.amount / this.moneyDivider).toString();
        this.consultationTags = this.serviceDetails.tags.map((tag) => tag.name);
        this.getDataFromBackend(this.serviceDetails.service.id);
      }
    });
    this.onModalCloseCallback = this.$scope.onModalCloseCallback;
    this.isLoading = false;
  }

  private getDataFromBackend = (serviceId: string): void => {
    this.isLoading = true;
    this.$q.all([
      this.ServiceApi.postServiceInvitationsRoute({serviceIds: [serviceId]}),
      this.EmploymentApi.getEmployeesRoute()
    ]).then((results) => {
      this.onGetServiceInvitations(results[0]);
      this.onGetEmployments(results[1]);
    }).catch(() => {
      this.isError = true;
    }).finally(() => {
      this.isLoading = false;
    });
  }

  public saveConsultation = (): void => {
    if (this.isFormValid()) {
      this.isLoading = true;
      if (this.serviceDetails) {
        this.ServiceApi.putServiceRoute(this.serviceDetails.service.id, this.createServiceModel()).then(() => {
          this.onModalCloseCallback();
          this.onModalClose();
        }, this.onReject);
      } else {
        this.ServiceApi.postServiceRoute(this.createServiceModel()).then(() => {
          this.onModalCloseCallback();
          this.onModalClose();
        }, this.onReject);
      }
    } else {
      this.isSubmitted = true;
    }
  }

  public isRegExpPriceValid = (isRegExpPriceValid: boolean): void => {
    this.isRegExpPriceInputValid = isRegExpPriceValid;
  }

  public onPriceChange = (ngModel: number): void => {
    const amount = Number(ngModel.toString().replace(',', '.'));
    this.isPriceAmountValid = amount <= this.consultationPriceMax && amount >= this.consultationPriceMin;
  }

  public isNameValid = (): boolean => this.consultationNamePattern.test(this.consultationName);

  public areTagsValid = (): boolean => this.consultationTags
    && this.consultationTags.length >= this.consultationTagsMinCount
    && this.consultationTags.length <= this.consultationTagsMaxCount

  public isLanguageValid = (): boolean => {
    if (this.isPlatformForExpert) {
      return true;
    } else {
      return this.consultationLanguage !== undefined && this.consultationLanguage.name.length > 0;
    }
  }

  public selectFreelance = (): void => {
    this.isFreelance = true;
    this.isOwnerEmployee = false;
  }

  public selectCompany = (): void => {
    this.isFreelance = false;
  }

  public isDescriptionValid = (): boolean => this.consultationDescriptionPattern.test(this.consultationDescription);

  public areInvitationsValid = (): boolean => {
    if (this.$scope.serviceDetails) {
      return true;
    } else if (this.isCompany) {
      return this.isOwnerEmployee ||
        (this.consultationNewInvitations.length >= this.consultationInvitationsMinCount
          && this.consultationNewInvitations.length <= this.consultationInvitationsMaxCount);
    }
    return true;
  }

  public isPriceValid = (): boolean => this.isPriceAmountValid && this.isRegExpPriceInputValid;

  public isFormValid = (): boolean =>
    this.isNameValid()
    && this.areTagsValid()
    && this.isLanguageValid()
    && this.isDescriptionValid()
    && this.areInvitationsValid()
    && this.isPriceValid()

  public onModalClose = (): void => this.$uibModalInstance.dismiss('cancel');

  private createServiceModel = (): PostService => {
    const priceModel: MoneyDto = {
      // TODO: refactor after https://git.contactis.pl/itelo/profitelo-frontend/issues/101
      amount: Number(this.consultationPrice.replace(',', '.')) * this.moneyDivider,
      currency: this.currency
    };
    const tags: PostServiceTag[] = this.consultationTags.map(consultationTag => {
      const tag: PostServiceTag = {name: consultationTag};
      return tag;
    });
    const emails = this.consultationNewInvitations
      .filter(emailOrPhone => emailOrPhone.indexOf('@') > -1)
      .map(email => {
        const invitation: IServiceInvitation = {email};
        return invitation;
      });
    const msisdns = this.consultationNewInvitations
      .filter(emailOrPhone => emailOrPhone.indexOf('@') < 0)
      .map(msisdn => {
        const invitation: IServiceInvitation = {msisdn};
        return invitation;
      });
    const invitations: IServiceInvitation[] = emails.concat(msisdns);
    const language = this.consultationLanguage ? this.consultationLanguage.value : '';
    const isOwnerEmployee = this.isExpert && !this.isCompany ? true : this.isOwnerEmployee;
    return {
      tags,
      invitations,
      language,
      isFreelance: this.isFreelance,
      isOwnerEmployee,
      description: this.consultationDescription,
      name: this.consultationName,
      price: priceModel
    };
  }

  private onGetServiceInvitations = (servicesWithInvitations: GetServiceWithInvitations[]): void => {
    const emailInvitation: string[] = _.flatMap(servicesWithInvitations, singleService =>
      singleService.invitations
        .filter(invitation => invitation.status === GetInvitation.StatusEnum.NEW)
        .filter(invitation => invitation.email)
        // tslint:disable-next-line:no-non-null-assertion
        .map(emailInvitation => emailInvitation.email!)
    );
    const msisdnInvitation: string[] = _.flatMap(servicesWithInvitations, singleService =>
      singleService.invitations
        .filter(invitation => invitation.status === GetInvitation.StatusEnum.NEW)
        .filter(invitation => invitation.msisdn)
        // tslint:disable-next-line:no-non-null-assertion
        .map(msisndInvitation => msisndInvitation.msisdn!)
    );
    this.consultationNewInvitations = emailInvitation.concat(msisdnInvitation);
  }

  private onGetEmployments = (employments: GetProfileDetailsWithEmployments[]): void => {
    const serviceOwnerEmployments: GetProfileDetailsWithEmployments | undefined =
      _.find<GetProfileDetailsWithEmployments>(employments, (employment) =>
        this.serviceDetails && employment.expertProfile.id === this.serviceDetails.ownerProfile.id);

    if (serviceOwnerEmployments)
      this.isOwnerEmployee = _.find(serviceOwnerEmployments.employments || [], (employment) =>
        (this.serviceDetails && this.serviceDetails.service.id === employment.serviceId)) !== undefined;
  }

  private onReject = (error: any): void => {
    this.isLoading = false;
    this.errorHandler.handleServerError(error, 'Can not save consultation',
      'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.MODAL.SAVE_ERROR_MESSAGE');
  }

  private assignValidationValues = (): void => {
    const localSettings = this.CommonSettingsService.localSettings;
    this.consultationNamePattern = localSettings.consultationNamePattern;
    this.consultationDescriptionPattern = localSettings.consultationDescriptionPattern;
    this.consultationTagsMinCount = localSettings.consultationTagsMinCount;
    this.consultationTagsMaxCount = localSettings.consultationTagsMaxCount;
    this.consultationInvitationsMinCount = localSettings.consultationInvitationsMinCount;
    this.consultationInvitationsMaxCount = localSettings.consultationInvitationsMaxCount;
    this.consultationPriceMin = localSettings.consultationPriceMin / this.moneyDivider;
    this.consultationPriceMax = localSettings.consultationPriceMax / this.moneyDivider;
  }

}
