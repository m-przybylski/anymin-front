import {ModalsService} from '../../../../common/services/modals/modals.service'
import {GetExpertServiceDetails, GetExpertProfile} from 'profitelo-api-ng/model/models'
import {ViewsApi} from 'profitelo-api-ng/api/api'
import {ErrorHandlerService} from '../../../../common/services/error-handler/error-handler.service'
import {UserService} from '../../../../common/services/user/user.service'

export class DashboardExpertManageProfileController {

  public isLoading: boolean = true
  public isError: boolean = false
  public expertName: string
  public expertAvatar: string
  public organizationName: string
  public organizationLogo: string
  public services: GetExpertServiceDetails[]

  private expertProfile: GetExpertProfile

  static $inject = ['modalsService', 'ViewsApi', 'errorHandler', 'userService'];

    constructor(private modalsService: ModalsService,
              private ViewsApi: ViewsApi,
              private errorHandler: ErrorHandlerService,
              private userService: UserService) {
    this.getExpertProfile()
  }

  public getExpertProfile = (): void => {
    this.userService.getUser().then((user) => {
      this.ViewsApi.getWebExpertProfileRoute(user.id).then((expertProfile) => {
        this.expertProfile = expertProfile
        if (expertProfile.profile.expertDetails) {
          this.expertName = expertProfile.profile.expertDetails.name
          this.expertAvatar = expertProfile.profile.expertDetails.avatar
        }
        if (expertProfile.profile.organizationDetails) {
          this.organizationName = expertProfile.profile.organizationDetails.name
          this.organizationLogo = expertProfile.profile.organizationDetails.logo
        }
        this.services = expertProfile.services.filter(serviceDetails =>
          serviceDetails.service.deletedAt === undefined
        )
        this.isLoading = false
      })
        .catch((error) => {
          this.isLoading = false
          this.isError = true
          this.errorHandler.handleServerError(error,
            'Can not load expert profile', 'DASHBOARD.EXPERT_ACCOUNT.MANAGE_PROFILE.PROFILE.GET_DATA_ERROR_MESSAGE')
        })
    })
  }

  public editCompanyProfile = (): void => {
    if (this.expertProfile.profile.organizationDetails)
      this.modalsService.createManageProfileEditProfileModal(this.expertProfile.profile.organizationDetails,
        this.getExpertProfile)
  }

  public editExpertProfile = (): void => {
    if (this.expertProfile.profile.expertDetails)
      this.modalsService.createManageProfileEditProfileModal(this.expertProfile.profile.expertDetails,
        this.getExpertProfile)
  }

  public openServiceFormModal = (): void => {
    this.modalsService.createServiceFormModal(this.getExpertProfile)
  }

}
