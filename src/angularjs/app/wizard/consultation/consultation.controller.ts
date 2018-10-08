// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-template
// tslint:disable:no-shadowed-variable
// tslint:disable:curly
import { WizardApi } from 'profitelo-api-ng/api/api';
import { GetWizardProfile, MoneyDto, GetWizardService, WizardTag } from 'profitelo-api-ng/model/models';
import { UserService } from '../../../common/services/user/user.service';
import { IServiceInvitation } from '../../../common/models/ServiceInvitation';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { ILanguage, LanguagesService } from '../../../common/services/languages/languages.service';
import { TranslatorService } from '../../../common/services/translator/translator.service';
import { CommonSettingsService } from '../../../common/services/common-settings/common-settings.service';
import { Config } from '../../../../config';
import { StateService, StateParams } from '@uirouter/angularjs';

export interface IConsultationStateParams extends StateParams {
  service: GetWizardService;
}

interface ILanguagesList {
  name: string;
  value: string;
}

// tslint:disable:member-ordering
// tslint:disable:max-file-line-count
export class ConsultationController implements ng.IController {
  public readonly inputNameMaxLength = Config.inputsLength.consultationName;
  public readonly inputDescriptionMaxLength = Config.inputsLength.consultationMaxDescription;
  public isStepRequired = true;
  public currency: string;
  public nameInputValue = '';
  public tagsInputValue: string[] = [];
  public priceAmountInputValue = '1,00';
  public invitationsInputValue: string[] = [];
  public isOwnerEmployee = true;
  public languagesList: ILanguagesList[];
  public languageInputValue: ILanguagesList;
  public descriptionInputValue = '';
  public isPlatformForExpert = Config.isPlatformForExpert;
  public isRegExpPriceInputValid = true;
  public isCompany: boolean;
  public isSubmitted = false;
  public isPriceAmountValid = true;
  public isFreelance = false;
  public isServiceTypeSelected = false;

  public hrefUrl = 'https://anymind.com/cennik-anymind/';

  private isExpert: boolean;
  private currentEditServiceIndex = -1;
  private moneyDivider = 100;
  private defaultLanguageISO = '';
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
    value: 'pl',
  };

  public static $inject = [
    'translatorService',
    '$state',
    '$stateParams',
    'WizardApi',
    'userService',
    'wizardProfile',
    'languagesService',
    'CommonSettingsService',
  ];

  constructor(
    private translatorService: TranslatorService,
    private $state: StateService,
    private $stateParams: IConsultationStateParams,
    private WizardApi: WizardApi,
    private userService: UserService,
    private wizardProfile: GetWizardProfile,
    private languagesService: LanguagesService,
    private CommonSettingsService: CommonSettingsService,
  ) {
    this.languagesList = this.languagesService.languagesList;

    this.assignValidationValues();

    if (wizardProfile) {
      this.isCompany = wizardProfile.isCompany;
      this.isExpert = wizardProfile.isExpert;
      if (this.isExpert) {
        this.isOwnerEmployee = true;
      }
    }
  }

  public $onInit(): void {
    this.checkIsPriceInputValid();

    this.userService.getUser().then(response => {
      this.currency = response.currency;
      this.defaultLanguageISO = response.countryISO;

      const language = _.find(
        this.languagesList,
        languageItem => languageItem.value.toLocaleLowerCase() === this.defaultLanguageISO.toLocaleLowerCase(),
      );

      language
        ? (this.languageInputValue = language)
        : (this.languageInputValue = ConsultationController.defaultConsultationLanguage);
    });

    if (this.$stateParams.service) {
      this.nameInputValue = this.$stateParams.service.name;
      this.isOwnerEmployee = this.$stateParams.service.isOwnerEmployee;
      this.priceAmountInputValue = (this.$stateParams.service.price.amount / this.moneyDivider).toString();
      this.$stateParams.service.tags.forEach(tag => {
        this.tagsInputValue.push(tag.name);
      });
      this.languageInputValue = {
        name: this.translatorService.translate('LANGUAGE.' + this.$stateParams.service.language),
        value: this.$stateParams.service.language,
      };
      this.descriptionInputValue = this.$stateParams.service.description;
      if (this.$stateParams.service.invitations) {
        this.$stateParams.service.invitations.forEach(employee => {
          if (employee.email) {
            this.invitationsInputValue.push(employee.email);
          } else if (employee.msisdn) {
            this.invitationsInputValue.push(employee.msisdn);
          }
        });
      }
      if (this.wizardProfile && this.wizardProfile.services)
        this.currentEditServiceIndex = _.findIndex(
          this.wizardProfile.services,
          service => service.name === this.$stateParams.service.name,
        );
    }
  }

  public saveStepsOnExpertPath = (): void => {
    if (this.isExpert && !this.isCompany) {
      this.saveConsultation();
    }
  };

  // tslint:disable-next-line:cyclomatic-complexity
  public saveConsultation = (): void => {
    if (this.checkIsFormValid() && this.wizardProfile) {
      const priceModel: MoneyDto = {
        amount: Number(this.priceAmountInputValue.replace(',', '.')) * this.moneyDivider,
        currency: this.currency,
      };
      const tags: WizardTag[] = [];
      this.tagsInputValue.forEach(tag => {
        tags.push({
          name: tag,
        });
      });

      const invitations: IServiceInvitation[] = [];
      this.invitationsInputValue.forEach(emailOrPhone => {
        if (emailOrPhone.indexOf('@') > -1) {
          invitations.push({
            email: emailOrPhone,
          });
        } else {
          invitations.push({
            msisdn: emailOrPhone,
          });
        }
      });
      const serviceModel: GetWizardService = {
        tags,
        invitations,
        isFreelance: this.isFreelance,
        language: this.languageInputValue.value,
        description: this.descriptionInputValue,
        name: this.nameInputValue,
        price: priceModel,
        isOwnerEmployee: this.isOwnerEmployee,
      };
      if (this.wizardProfile.services && !this.$stateParams.service) {
        this.wizardProfile.services.push(serviceModel);
      } else if (this.wizardProfile.services && this.wizardProfile.services.length < 1) {
        this.wizardProfile.services = [serviceModel];
      } else if (this.wizardProfile.services && this.$stateParams.service && this.currentEditServiceIndex > -1) {
        this.wizardProfile.services[this.currentEditServiceIndex] = serviceModel;
      }
      this.WizardApi.putWizardProfileRoute(this.wizardProfile).then(() => {
        this.$state.go('app.wizard.summary');
      });
    } else {
      this.isSubmitted = true;
    }
  };

  public onGoBack = (): void => {
    this.$state.go('app.wizard.summary');
  };

  public selectFreelance = (): void => {
    this.isServiceTypeSelected = true;
    this.isFreelance = true;
    this.isOwnerEmployee = true;
  };

  public selectCompany = (): void => {
    this.isServiceTypeSelected = true;
    this.isFreelance = false;
  };

  public isRegExpPriceValid = (isRegExpPriceValid: boolean): void => {
    this.isRegExpPriceInputValid = isRegExpPriceValid;
  };

  public onPriceChange = (ngModel: number): void => {
    const amount = Number(ngModel.toString().replace(',', '.'));
    this.isPriceAmountValid = amount <= this.consultationPriceMax && amount >= this.consultationPriceMin;
  };

  public checkIsNameInputValid = (): boolean => this.consultationNamePattern.test(this.nameInputValue);

  public checkIsTagsInputValid = (): boolean =>
    this.tagsInputValue &&
    this.tagsInputValue.length >= this.consultationTagsMinCount &&
    this.tagsInputValue.length <= this.consultationTagsMaxCount;

  public checkIsDescriptionInputValid = (): boolean =>
    this.consultationDescriptionPattern.test(this.descriptionInputValue);

  public checkIsEmployeesInputValid = (): boolean =>
    (this.isOwnerEmployee && this.invitationsInputValue.length <= this.consultationInvitationsMaxCount) ||
    (this.invitationsInputValue.length >= this.consultationInvitationsMinCount &&
      this.invitationsInputValue.length <= this.consultationInvitationsMaxCount);

  public checkIsFormValid = (): boolean =>
    this.checkIsNameInputValid() &&
    this.checkIsTagsInputValid() &&
    this.checkIsPriceInputValid() &&
    this.checkIsEmployeesInputValid() &&
    this.checkIsDescriptionInputValid();

  public checkIsPriceButtonDisabled = (): boolean => !this.isCompany || this.checkIsPriceInputValid();

  public checkIsPriceInputValid = (): boolean => this.isPriceAmountValid && this.isRegExpPriceInputValid;

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
  };
}
