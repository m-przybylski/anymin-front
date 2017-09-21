import {ProfileApi} from 'profitelo-api-ng/api/api';
import {TopAlertService} from '../../../../../../services/top-alert/top-alert.service'
import {GetOrganizationDetails, GetExpertDetails, OrganizationDetailsUpdate, ExpertDetailsUpdate}
  from 'profitelo-api-ng/model/models';

export interface IEditExpertProfileScope extends ng.IScope {
  profile: GetOrganizationDetails | GetExpertDetails
  onModalCloseCallback: () => void
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
  public readonly inputDescriptionMaxLength: number = 600
  public readonly inputNameMaxLength: number = 150

  private static readonly minValidExpertNameLength: number = 3
  private static readonly minValidExpertDescriptionLength: number = 50
  private isUploading: boolean = true

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private ProfileApi: ProfileApi,
              private $log: ng.ILogService,
              private topAlertService: TopAlertService,
              private $filter: ng.IFilterService,
              private $scope: IEditExpertProfileScope) {}

  $onInit(): void {
    if (this.isGetExpertDetails(this.$scope.profile)) {
      this.profileAvatarToken = this.$scope.profile.avatar
    } else {
      this.profileAvatarToken = this.$scope.profile.logo
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

  public isAvatarValid = (): boolean => !!(this.profileAvatarToken && this.profileAvatarToken.length > 0)

  public isNameValid = (): boolean => !!(this.profileName
    && this.profileName.length >= EditExpertProfileController.minValidExpertNameLength)

  public isDescriptionValid = (): boolean => !!(this.profileDescription
    && this.profileDescription.length >= EditExpertProfileController.minValidExpertDescriptionLength)

  private isFileUploadValid = (): boolean => this.isUploading

  public onUploadingFile = (status: boolean): void => {
    this.isUploading = status
  }

  public isFormValid = (): boolean =>
    this.isAvatarValid()
    && this.isNameValid()
    && this.isDescriptionValid()
    && this.isFileUploadValid()

  private isGetExpertDetails = (profile: GetOrganizationDetails | GetExpertDetails): profile is GetExpertDetails =>
    (<GetExpertDetails>profile).avatar !== undefined

  private sendUpdatedProfile = (updatedProfile: OrganizationDetailsUpdate | ExpertDetailsUpdate): void => {
    this.ProfileApi.patchProfileRoute(updatedProfile).then((_res) => {
      this.$scope.onModalCloseCallback()
      this.onModalClose()
    }, (err) => {
      this.$log.error(err)
      this.topAlertService.warning({
        message: this.$filter('translate')('DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.MODAL.SAVE_ERROR_MESSAGE'),
        timeout: 5
      })
    })
  }

}
