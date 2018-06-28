// tslint:disable:prefer-template
// tslint:disable:no-shadowed-variable
import { WizardApi } from 'profitelo-api-ng/api/api';
import { PutWizardProfile, PartialExpertDetails, GetWizardProfile } from 'profitelo-api-ng/model/models';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import * as angular from 'angular';
import { IProgressStyle } from '../../../../common/components/wizard/wizard-handler/wizard-handler.controller';
import { CommonSettingsService } from '../../../../common/services/common-settings/common-settings.service';
import { Config } from '../../../../../config';
import { StateService } from '@uirouter/angularjs';

// tslint:disable:member-ordering
export class ExpertController implements ng.IController {
  public readonly inputNameMaxLength = Config.inputsLength.profileName;
  public readonly inputDescriptionMaxLength = Config.inputsLength.profileDescription;
  public currentWizardState: PutWizardProfile = {
    isExpert: false,
    isCompany: false,
    isSummary: false
  };
  public nameModel: string | undefined = '';
  public avatarModel?: string;
  public descriptionModel: string | undefined = '';
  public filesModel?: string[] = [];
  public linksModel?: string[] = [];
  public progressStyle: IProgressStyle;
  public progressBarTittle = 'WIZARD.STEP.EXPERT.PROGRESSBAR.TITLE';
  public isSubmitted = false;
  public isStepRequired = true;
  public isPlatformForExpert = Config.isPlatformForExpert;
  private isUploading = true;
  private profileNamePattern: RegExp;
  private profileDescriptionPattern: RegExp;

  public static $inject = ['WizardApi', '$state', 'CommonSettingsService', 'wizardProfile'];

    constructor(private WizardApi: WizardApi,
              private $state: StateService,
              private CommonSettingsService: CommonSettingsService,
              private wizardProfile?: GetWizardProfile) {
    this.assignValidationValues();
  }

  // tslint:disable-next-line:cyclomatic-complexity
  public $onInit = (): void => {
    if (this.wizardProfile) {
      this.currentWizardState = angular.copy(this.wizardProfile);
      if (this.wizardProfile.expertDetailsOption) {
        this.nameModel = this.wizardProfile.expertDetailsOption.name;
        this.avatarModel = this.wizardProfile.expertDetailsOption.avatar;
        this.filesModel = this.wizardProfile.expertDetailsOption.files;
        this.descriptionModel = this.wizardProfile.expertDetailsOption.description;
        this.linksModel = this.wizardProfile.expertDetailsOption.links;
      }
    }

    this.currentWizardState.isExpert = true;
    if (!this.wizardProfile || this.wizardProfile.isCompany && !this.wizardProfile.isSummary) {
      this.currentWizardState.isCompany = false;
    }
    this.progressBarTittle = this.currentWizardState.isCompany ?
      'WIZARD.STEP.EXPERT_AS_COMPANY.PROGRESSBAR.TITLE' : 'WIZARD.STEP.EXPERT.PROGRESSBAR.TITLE';
    this.saveWizardState(this.currentWizardState);
  }

  public onGoBack = (): void => {
    if (this.wizardProfile && !this.wizardProfile.isSummary) {
      this.currentWizardState.isExpert = false;
      this.currentWizardState.isCompany = false;
      this.saveWizardState(this.currentWizardState).then(() => {
        this.$state.go('app.wizard.create-profile');
      });
    } else {
      this.goToSummary();
    }
  }

  public saveSteps = (): void => {
    const wizardExpertModel: PartialExpertDetails = {
      name: this.nameModel,
      avatar: this.avatarModel,
      description: this.descriptionModel,
      files: this.filesModel,
      links: this.linksModel
    };

    if (this.checkIsAnyStepModelChange(wizardExpertModel)) {
      this.currentWizardState.expertDetailsOption = angular.copy(wizardExpertModel);
      this.saveWizardState(this.currentWizardState);
    }
  }

  public goToSummary = (): void => {
    if (this.checkIsFormValid()) {
      // tslint:disable-next-line:no-non-null-assertion
      this.currentWizardState.expertDetailsOption!.links = this.linksModel;
      this.currentWizardState.isSummary = true;
      if (this.isPlatformForExpert) {
        // tslint:disable-next-line:no-non-null-assertion
        this.currentWizardState.expertDetailsOption!.description = this.descriptionModel;
      }
      this.saveWizardState(this.currentWizardState).then(() => {
        this.$state.go('app.wizard.summary');
      });
    } else {
      this.isSubmitted = true;
    }
  }

  public checkIsNameInputValid = (): boolean => this.nameModel ?
    this.profileNamePattern.test(this.nameModel) : false

  public checkIsAvatarValid = (): boolean => !!(this.avatarModel && this.avatarModel.length > 0);

  public checkIsProfileDescriptionValid = (): boolean => this.descriptionModel ?
    this.profileDescriptionPattern.test(this.descriptionModel) : false

  public checkIsFileUploadValid = (): boolean => this.isUploading;

  public onUploadingFile = (status: boolean): void => {
    this.isUploading = status;
  }

  public checkIsFormValid = (): boolean =>
    !!(this.currentWizardState.expertDetailsOption
      && this.checkIsNameInputValid()
      && this.checkIsAvatarValid()
      && this.checkIsProfileDescriptionValid()
      && this.checkIsFileUploadValid())

  private saveWizardState = (wizardState: PutWizardProfile): ng.IPromise<GetWizardProfile> =>
    this.WizardApi.putWizardProfileRoute(wizardState)
    .catch((error) => {
      throw new Error('Can not save profile steps' + String(error));
    })

  private checkIsAnyStepModelChange = (currentFormModel: PartialExpertDetails): boolean =>
    !this.currentWizardState.expertDetailsOption
      || !(_.isEqual(this.currentWizardState.expertDetailsOption, currentFormModel))

  private assignValidationValues = (): void => {
    const localSettings = this.CommonSettingsService.localSettings;
    this.profileNamePattern = localSettings.profileNamePattern;
    this.profileDescriptionPattern = localSettings.profileDescriptionPattern;
  }
}
