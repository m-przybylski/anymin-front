import {IExpertProfileStateParams} from './expert-profile'
import {ProfileApi} from 'profitelo-api-ng/api/api'
import {GetExpertProfile} from 'profitelo-api-ng/model/models'

/* @ngInject */
export function ExpertProfileController($stateParams: IExpertProfileStateParams, $log: ng.ILogService,
                                        expertProfile: GetExpertProfile, ProfileApi: ProfileApi) {

  this.profile = {}

  this.profile = expertProfile.profile.expertDetails
  this.consultations = expertProfile.services
  this.profile.type = 'single'
  this.profile.isFavourite = expertProfile.isFavourite

  this.profile.colaboratedOrganizations = expertProfile.employers
  this.services = expertProfile.services

  const onProfileLike = () =>
    this.profile.isFavourite = true

  const onProfileLikeError = (error: any) =>
    $log.error('Can not like this company because: ' + error)

  const onProfileDislike = () =>
    this.profile.isFavourite = false

  const onProfileDislikeError = (error: any) =>
    $log.error('Can not dislike this company because: ' + error)


  this.handleLike = () => {
    if (!this.profile.isFavourite) {
      ProfileApi.postProfileFavouriteExpertRoute($stateParams.profileId)
        .then(onProfileLike, onProfileLikeError)
    } else {
      ProfileApi.deleteProfileFavouriteExpertRoute($stateParams.profileId)
        .then(onProfileDislike, onProfileDislikeError)
    }
  }

  return this
}
