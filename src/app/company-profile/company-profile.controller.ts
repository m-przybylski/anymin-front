import {ICompanyProfileStateParams} from './company-profile'
import {ProfileApi} from 'profitelo-api-ng/api/api'
import {ICompanyProfile} from './company-profile.resolver'
import {GetOrganizationDetails, GetOrganizationServiceDetails} from 'profitelo-api-ng/model/models'
import {ProfileTypes} from '../../common/components/profile/profile-header/profile-header'

/* @ngInject */
export class CompanyProfileController {

  profile?: GetOrganizationDetails
  consultations: Array<GetOrganizationServiceDetails>
  isFavourite: boolean
  profileType: ProfileTypes

  constructor(private $stateParams: ICompanyProfileStateParams, private $log: ng.ILogService,
              private ProfileApi: ProfileApi, companyProfile: ICompanyProfile) {

    this.profile = companyProfile.profile.organizationDetails
    this.consultations = companyProfile.services
    this.isFavourite = companyProfile.isFavourite
    this.profileType = ProfileTypes.company
  }

  private onProfileLike = () =>
    this.isFavourite = true

  private onProfileLikeError = (error: any) =>
    this.$log.error('Can not like this company because: ' + error)

  private onProfileDislike = () =>
    this.isFavourite = false

  private onProfileDislikeError = (error: any) =>
    this.$log.error('Can not dislike this company because: ' + error)

  public handleLike = () => {
    if (!this.isFavourite) {
      this.ProfileApi.postProfileFavouriteOrganizationRoute(this.$stateParams.profileId)
      .then(this.onProfileLike, this.onProfileLikeError)
    } else {
      this.ProfileApi.deleteProfileFavouriteOrganizationRoute(this.$stateParams.profileId)
      .then(this.onProfileDislike, this.onProfileDislikeError)
    }
  }

}
