import {IExpertProfileStateParams} from './expert-profile'
import {ProfileApi} from 'profitelo-api-ng/api/api'
import {GetExpertProfile, GetExpertDetails, GetExpertServiceDetails} from 'profitelo-api-ng/model/models'
import {ProfileTypes} from '../../common/components/profile/profile-header/profile-header'

/* @ngInject */
export class ExpertProfileController {

  public profile: GetExpertDetails | undefined
  public consultations: Array<GetExpertServiceDetails>
  public isFavourite: boolean
  public profileType: ProfileTypes
  public profileId: string

  constructor(private $stateParams: IExpertProfileStateParams, private $log: ng.ILogService,
              expertProfile: GetExpertProfile, private ProfileApi: ProfileApi) {

    this.profile = expertProfile.profile.expertDetails
    this.consultations = expertProfile.services
    this.isFavourite = expertProfile.isFavourite
    this.profileType = ProfileTypes.expert
    this.profileId = expertProfile.profile.id
  }

  public onProfileLike = () =>
    this.isFavourite = true

  public onProfileLikeError = (error: any) =>
    this.$log.error('Can not like this company because: ' + error)

  public onProfileDislike = () =>
    this.isFavourite = false

  public onProfileDislikeError = (error: any) =>
    this.$log.error('Can not dislike this company because: ' + error)

  public handleLike = () => {
    if (!this.isFavourite) {
      this.ProfileApi.postProfileFavouriteExpertRoute(this.$stateParams.profileId)
        .then(this.onProfileLike, this.onProfileLikeError)
    } else {
      this.ProfileApi.deleteProfileFavouriteExpertRoute(this.$stateParams.profileId)
        .then(this.onProfileDislike, this.onProfileDislikeError)
    }
  }

}
