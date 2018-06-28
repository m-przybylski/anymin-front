// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-template
// tslint:disable:no-shadowed-variable
import { PutWizardProfile, PartialOrganizationDetails, GetWizardProfile } from 'profitelo-api-ng/model/models';
import { WizardApi } from 'profitelo-api-ng/api/api';
import { StateService } from '@uirouter/angularjs';

// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import * as angular from 'angular';
import { CommonSettingsService } from '../../../../common/services/common-settings/common-settings.service';
import { Config } from '../../../../../config';

// tslint:disable:member-ordering
export class CompanyController implements ng.IController {
  public readonly inputDescriptionMaxLength = Config.inputsLength.profileDescription;
  public readonly inputNameMaxLength = Config.inputsLength.profileName;
  public currentWizardState: PutWizardProfile = {
    isExpert: false,
    isCompany: false,
    isSummary: false
  };

  public nameModel: string | undefined = '';
  public logoModel?: string;
  public descriptionModel: string | undefined = '';
  public filesModel?: string[] = [];
  public linksModel?: string[] = [];
  public dictionary: {
    [key: string]: string
  };
  public isPlatformForExpert = Config.isPlatformForExpert;
  public isSubmitted = false;
  public isStepRequired = true;
  private isUploading = true;
  private companyNamePattern: RegExp;
  private companyDescriptionPattern: RegExp;
  public static $inject = ['WizardApi', '$state', 'CommonSettingsService', 'wizardProfile'];

    constructor(private WizardApi: WizardApi,
              private $state: StateService,
              private CommonSettingsService: CommonSettingsService,
              private wizardProfile?: GetWizardProfile) {
    this.assignValidationValues();
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

  public $onInit = (): void => {
    if (this.wizardProfile) {
      this.currentWizardState = angular.copy(this.wizardProfile);
      if (this.wizardProfile.organizationDetailsOption) {
        this.nameModel = this.wizardProfile.organizationDetailsOption.name;
        this.logoModel = this.wizardProfile.organizationDetailsOption.logo;
        this.filesModel = this.wizardProfile.organizationDetailsOption.files;
        this.descriptionModel = this.wizardProfile.organizationDetailsOption.description;
        this.linksModel = this.wizardProfile.organizationDetailsOption.links;
      }
    }
    this.currentWizardState.isCompany = true;
    if (!this.wizardProfile || this.wizardProfile.isExpert && !this.wizardProfile.isSummary) {
      this.currentWizardState.isExpert = false;
    }
    this.saveWizardState(this.currentWizardState);
  }

  public saveSteps = (): void => {
    const wizardOrganizationModel: PartialOrganizationDetails = {
      name: this.nameModel,
      logo: this.logoModel,
      description: this.descriptionModel,
      files: this.filesModel,
      links: this.linksModel
    };

    if (this.checkIsAnyStepModelChange(wizardOrganizationModel)) {
      this.currentWizardState.organizationDetailsOption = angular.copy(wizardOrganizationModel);
      this.saveWizardState(this.currentWizardState);
    }
  }

  public goToSummary = (): void => {
    if (this.checkIsFormValid()) {
      // tslint:disable-next-line:no-non-null-assertion
      this.currentWizardState.organizationDetailsOption!.links = this.linksModel;
      this.currentWizardState.isSummary = true;
      if (this.isPlatformForExpert) {
        // tslint:disable-next-line:no-non-null-assertion
        this.currentWizardState.organizationDetailsOption!.description = this.descriptionModel;
      }
      this.saveWizardState(this.currentWizardState).then(() => {
        this.$state.go('app.wizard.summary');
      });
    } else {
      this.isSubmitted = true;
    }
  }

  public checkIsNameInputValid = (): boolean => this.nameModel ? this.companyNamePattern.test(this.nameModel) : false;

  public checkIsLogoValid = (): boolean => (this.logoModel) ? this.logoModel.length > 0 : false;

  public checkIsProfileDescriptionValid = (): boolean =>
    this.descriptionModel ? this.companyDescriptionPattern.test(this.descriptionModel) : false

  public checkIsFileUploadValid = (): boolean => this.isUploading;

  public onUploadingFile = (status: boolean): void => {
    this.isUploading = status;
  }

  public checkIsFormValid = (): boolean =>
    !!(this.currentWizardState.organizationDetailsOption
    && this.checkIsNameInputValid()
    && this.checkIsLogoValid()
    && this.checkIsProfileDescriptionValid()
    && this.checkIsFileUploadValid()
    )

  private saveWizardState = (wizardState: PutWizardProfile): ng.IPromise<GetWizardProfile> =>
    this.WizardApi.putWizardProfileRoute(wizardState)
    .catch((error) => {
      throw new Error('Can not save profile steps' + String(error));
    })

  private checkIsAnyStepModelChange = (currentFormModel: PartialOrganizationDetails): boolean =>
    !this.currentWizardState.organizationDetailsOption
      || !(_.isEqual(this.currentWizardState.organizationDetailsOption, currentFormModel))

  private assignValidationValues = (): void => {
    const localSettings = this.CommonSettingsService.localSettings;
    this.companyNamePattern = localSettings.profileNamePattern;
    this.companyDescriptionPattern = localSettings.profileDescriptionPattern;
  }

}
