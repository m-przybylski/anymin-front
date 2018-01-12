import {ProfileApi} from 'profitelo-api-ng/api/api';
import {TopAlertService} from '../../../../../../services/top-alert/top-alert.service'
import {GetOrganizationDetails, GetExpertDetails, UpdateProfile}
  from 'profitelo-api-ng/model/models';
import {TranslatorService} from '../../../../../../services/translator/translator.service'
import {CommonSettingsService} from '../../../../../../services/common-settings/common-settings.service'
import {Config} from '../../../../../../../app/config';

export interface IEditExpertProfileScope extends ng.IScope {
  profile: GetOrganizationDetails | GetExpertDetails
  onModalCloseCallback: () => void
}

interface ILabels {
  expertName: string
  expertDescription: string
  organizationName: string
  organizationDescription: string
}

export class EditExpertProfileController implements ng.IController {

  public profileAvatarToken: string
  public profileFilesTokens: string[] = []
  public profileName: string
  public profileDescription: string
  public profileLinks: string[] = []
  public isLoading: boolean = false
  public isFullscreen: boolean = true
  public isNavbar: boolean = true
  public isSubmitted: boolean = false
  public profileNameLabel: string
  public profileDescriptionLabel: string
  public readonly inputDescriptionMaxLength: string = Config.inputsMaxLength.profileDescription
  public readonly inputNameMaxLength: string = Config.inputsMaxLength.profileName

  private static readonly labels: ILabels = {
    expertName: 'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.MODAL.EXPERT_NAME.TITLE',
    expertDescription: 'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.MODAL.EXPERT_DESCRIPTION.TITLE',
    organizationName: 'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.MODAL.ORGANIZATION_NAME.TITLE',
    organizationDescription: 'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.MODAL.ORGANIZATION_DESCRIPTION.TITLE'
  }
  private isUploaded: boolean = true
  private profileNamePattern: RegExp = this.CommonSettingsService.localSettings.profileNamePattern
  private profileDescriptionPattern: RegExp = this.CommonSettingsService.localSettings.profileDescriptionPattern

  static $inject = ['$uibModalInstance', 'ProfileApi', '$log', 'topAlertService', 'translatorService',
    '$scope', 'CommonSettingsService'];

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private ProfileApi: ProfileApi,
              private $log: ng.ILogService,
              private topAlertService: TopAlertService,
              private translatorService: TranslatorService,
              private $scope: IEditExpertProfileScope,
              private CommonSettingsService: CommonSettingsService) {}

  $onInit(): void {
    if (this.isGetExpertDetails(this.$scope.profile)) {
      this.profileAvatarToken = this.$scope.profile.avatar
      this.profileNameLabel = EditExpertProfileController.labels.expertName
      this.profileDescriptionLabel = EditExpertProfileController.labels.expertDescription
    } else {
      this.profileAvatarToken = this.$scope.profile.logo
      this.profileNameLabel = EditExpertProfileController.labels.organizationName
      this.profileDescriptionLabel = EditExpertProfileController.labels.organizationDescription
    }
      this.profileName = this.$scope.profile.name
      this.profileDescription = this.$scope.profile.description
      this.profileLinks = this.$scope.profile.links
      this.$scope.profile.files.forEach((file) => {
        this.profileFilesTokens.push(file.token)
    })
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
      }
      this.sendUpdatedProfile(updatedProfile)
    } else if (this.isFormValid() && !this.isGetExpertDetails(this.$scope.profile)) {
      const updatedProfile = {
        organizationDetails: {
          name: this.profileName,
          logo: this.profileAvatarToken,
          description: this.profileDescription,
          files: this.profileFilesTokens,
          links: this.profileLinks
        }
      }
      this.sendUpdatedProfile(updatedProfile)
    } else {
      this.isSubmitted = true
    }
  }

  public onModalClose = (): void => this.$uibModalInstance.dismiss('cancel')

  public isAvatarValid = (): boolean => (this.profileAvatarToken) ? this.profileAvatarToken.length > 0 : false

  public isNameValid = (): boolean => (this.profileName) ?
    this.profileNamePattern.test(this.profileName) : false

  public isDescriptionValid = (): boolean => (this.profileDescription) ?
    this.profileDescriptionPattern.test(this.profileDescription) : false

  private isFileUploadValid = (): boolean => this.isUploaded

  public onFileUploadEnd = (isNotError: boolean): void => {
    this.isUploaded = isNotError
  }

  public isFormValid = (): boolean =>
    this.isAvatarValid()
    && this.isNameValid()
    && this.isDescriptionValid()
    && this.isFileUploadValid()

  private isGetExpertDetails = (profileDetails: GetOrganizationDetails | GetExpertDetails):
    profileDetails is GetExpertDetails => (<GetExpertDetails>profileDetails).avatar !== undefined

  private sendUpdatedProfile = (updatedProfile: UpdateProfile): void => {
    this.ProfileApi.patchProfileRoute(updatedProfile).then((_res) => {
      this.$scope.onModalCloseCallback()
      this.onModalClose()
    }, (err) => {
      this.$log.error(err)
      this.topAlertService.error({
        message: this.translatorService.translate('DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.MODAL.SAVE_ERROR_MESSAGE'),
        timeout: 5
      })
    })
  }

}
