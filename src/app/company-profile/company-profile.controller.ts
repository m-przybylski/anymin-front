import {ICompanyProfileStateParams} from './company-profile'
import {SmoothScrollingService} from '../../common/services/smooth-scrolling/smooth-scrolling.service'
import {ProfileApi} from 'profitelo-api-ng/api/api'
import {RecommendedServicesService} from '../../common/services/recommended-services/recommended-services.service'
import {ICompanyProfile} from './company-profile.resolver'

/* @ngInject */
export function CompanyProfileController($stateParams: ICompanyProfileStateParams, $timeout: ng.ITimeoutService,
                                         $log: ng.ILogService, smoothScrollingService: SmoothScrollingService,
                                         ProfileApi: ProfileApi, recommendedServices: RecommendedServicesService,
                                         companyProfile: ICompanyProfile) {

  this.profile = {}

  this.profile = companyProfile.profile.organizationDetails
  this.consultations = companyProfile.services
  this.profile.type = 'company'
  this.profile.isFavourite = companyProfile.isFavourite

  if (!!$stateParams.primaryConsultationId) {
    $timeout(() => {
      smoothScrollingService.simpleScrollTo('#consultationScroll', true)
    })
  }

  recommendedServices.getRecommendedCompanies(this.consultations).then((response) => {
    this.similarCompany = response
  })

  this.services = companyProfile.services

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
      ProfileApi.postProfileFavouriteOrganizationRoute($stateParams.profileId)
        .then(onProfileLike, onProfileLikeError)
    } else {
      ProfileApi.deleteProfileFavouriteOrganizationRoute($stateParams.profileId)
        .then(onProfileDislike, onProfileDislikeError)
    }
  }

  return this
}
