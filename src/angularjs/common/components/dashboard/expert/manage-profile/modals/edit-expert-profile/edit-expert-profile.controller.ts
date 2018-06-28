// tslint:disable:prefer-method-signature
// tslint:disable:no-shadowed-variable
// tslint:disable:deprecation
import { ProfileApi } from 'profitelo-api-ng/api/api';
import { TopAlertService } from '../../../../../../services/top-alert/top-alert.service';
import { UpdateProfile } from 'profitelo-api-ng/model/models';
import { TranslatorService } from '../../../../../../services/translator/translator.service';
import { CommonSettingsService } from '../../../../../../services/common-settings/common-settings.service';
import { Config } from '../../../../../../../../config';
import { OrganizationProfileWithDocuments } from '@anymind-ng/api/model/organizationProfileWithDocuments';
import { ExpertProfileWithDocuments } from '@anymind-ng/api';

export interface IEditExpertProfileScope extends ng.IScope {
  profile: ExpertProfileWithDocuments | OrganizationProfileWithDocuments;
  onModalCloseCallback: () => void;
}

interface IEditProfileTranslations {
  expertNameLabel: string;
  expertDescriptionLabel: string;
  expertNamePlaceholder: string;
  organizationNameLabel: string;
  organizationNamePlaceholder: string;
  organizationDescriptionLabel: string;
}

// tslint:disable:strict-type-predicates
// tslint:disable:member-ordering
export class EditExpertProfileController implements ng.IController {

  public profileAvatarToken: string;
  public profileFilesTokens: string[] = [];
  public profileName: string;
  public profileDescription: string;
  public profileLinks: string[] = [];
  public isLoading = false;
  public isFullscreen = true;
  public isNavbar = true;
  public isSubmitted = false;
  public profileNameLabel: string;
  public profileNamePlaceholder: string;
  public profileDescriptionLabel: string;
  public isInputRequired = true;
  public readonly inputDescriptionMaxLength = Config.inputsLength.profileDescription;
  public readonly inputNameMaxLength = Config.inputsLength.profileName;

  private static readonly translations: IEditProfileTranslations = {
    expertNameLabel: 'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.MODAL.EXPERT_NAME.TITLE',
    expertNamePlaceholder: 'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.MODAL.EXPERT_NAME.PLACEHOLDER',
    expertDescriptionLabel: 'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.MODAL.EXPERT_DESCRIPTION.TITLE',
    organizationNameLabel: 'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.MODAL.ORGANIZATION_NAME.TITLE',
    organizationNamePlaceholder: 'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.MODAL.ORGANIZATION_NAME.PLACEHOLDER',
    organizationDescriptionLabel: 'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.MODAL.ORGANIZATION_DESCRIPTION.TITLE'
  };
  private isUploaded = true;
  private profileNamePattern: RegExp = this.CommonSettingsService.localSettings.profileNamePattern;
  private profileDescriptionPattern: RegExp = this.CommonSettingsService.localSettings.profileDescriptionPattern;

  public static $inject = ['$uibModalInstance', 'ProfileApi', '$log', 'topAlertService', 'translatorService',
    '$scope', 'CommonSettingsService'];

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private ProfileApi: ProfileApi,
              private $log: ng.ILogService,
              private topAlertService: TopAlertService,
              private translatorService: TranslatorService,
              private $scope: IEditExpertProfileScope,
              private CommonSettingsService: CommonSettingsService) {}

  public $onInit(): void {
    if (this.isGetExpertDetails(this.$scope.profile)) {
      this.profileAvatarToken = this.$scope.profile.avatar;
      this.profileNameLabel = EditExpertProfileController.translations.expertNameLabel;
      this.profileNamePlaceholder = EditExpertProfileController.translations.expertNamePlaceholder;
      this.profileDescriptionLabel = EditExpertProfileController.translations.expertDescriptionLabel;
    } else {
      this.profileAvatarToken = this.$scope.profile.logo;
      this.profileNameLabel = EditExpertProfileController.translations.organizationNameLabel;
      this.profileNamePlaceholder = EditExpertProfileController.translations.organizationNamePlaceholder;
      this.profileDescriptionLabel = EditExpertProfileController.translations.organizationDescriptionLabel;
    }
      this.profileName = this.$scope.profile.name;
      this.profileDescription = this.$scope.profile.description;
  }

  public saveChanges = (): void => {
    if (this.isFormValid() && this.isGetExpertDetails(this.$scope.profile)) {
      const updatedProfile = {
        expertDetails: {
          name: this.profileName,
          avatar: this.profileAvatarToken,
          description: this.profileDescription,
          files: this.profileFilesTokens,
          links: this.profileLinks
        }
      };
      this.sendUpdatedProfile(updatedProfile);
    } else if (this.isFormValid() && !this.isGetExpertDetails(this.$scope.profile)) {
      const updatedProfile = {
        organizationDetails: {
          name: this.profileName,
          logo: this.profileAvatarToken,
          description: this.profileDescription,
          files: this.profileFilesTokens,
          links: this.profileLinks
        }
      };
      this.sendUpdatedProfile(updatedProfile);
    } else {
      this.isSubmitted = true;
    }
  }

  public onModalClose = (): void => this.$uibModalInstance.dismiss('cancel');

  public isAvatarValid = (): boolean => (this.profileAvatarToken) ? this.profileAvatarToken.length > 0 : false;

  public isNameValid = (): boolean => (this.profileName) ?
    this.profileNamePattern.test(this.profileName) : false

  public isDescriptionValid = (): boolean => (this.profileDescription) ?
    this.profileDescriptionPattern.test(this.profileDescription) : false

  private isFileUploadValid = (): boolean => this.isUploaded;

  public onFileUploadEnd = (isNotError: boolean): void => {
    this.isUploaded = isNotError;
  }

  public isFormValid = (): boolean =>
    this.isAvatarValid()
    && this.isNameValid()
    && this.isDescriptionValid()
    && this.isFileUploadValid()

  private isGetExpertDetails = (profileDetails: OrganizationProfileWithDocuments | ExpertProfileWithDocuments):
    profileDetails is ExpertProfileWithDocuments => (<ExpertProfileWithDocuments>profileDetails).avatar !== undefined

  private sendUpdatedProfile = (updatedProfile: UpdateProfile): void => {
    this.ProfileApi.patchProfileRoute(updatedProfile).then((_res) => {
      this.$scope.onModalCloseCallback();
      this.onModalClose();
    }, (err) => {
      this.$log.error(err);
      this.topAlertService.error({
        message: this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.MODAL.SAVE_ERROR_MESSAGE'),
        timeout: 5
      });
    });
  }

}
