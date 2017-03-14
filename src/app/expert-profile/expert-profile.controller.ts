import {IExpertProfileStateParams} from "./expert-profile"
import {ProfileApi} from "profitelo-api-ng/api/api"
import {GetExpertProfile} from "profitelo-api-ng/model/models"
import {RecommendedServicesService} from "../../common/services/recommended-services/recommended-services.service"
import {SmoothScrollingService} from "../../common/services/smooth-scrolling/smooth-scrolling.service"

/* @ngInject */
export function ExpertProfileController($stateParams: IExpertProfileStateParams, $log: ng.ILogService,
                                        $timeout: ng.ITimeoutService, expertProfile: GetExpertProfile,
                                        recommendedServices: RecommendedServicesService, ProfileApi: ProfileApi,
                                        smoothScrollingService: SmoothScrollingService) {

  this.profile = {}

  this.profile = expertProfile.profile.expertDetails
  this.consultations = expertProfile.services
  this.profile.type = 'single'
  this.profile.isFavourite = expertProfile.isFavourite

  if (!!$stateParams.primaryConsultationId) {
    $timeout(() => {
      smoothScrollingService.simpleScrollTo('#consultationScroll', true)
    })
  }

  this.profile.colaboratedOrganizations = expertProfile.employers
  this.services = expertProfile.services

  recommendedServices.getRecommendedExperts(this.consultations).then((response) => {
    this.similarExperts = response
  })

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
