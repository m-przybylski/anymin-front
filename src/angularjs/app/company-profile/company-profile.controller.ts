import { ICompanyProfileStateParams } from './company-profile';
import { ProfileApi } from 'profitelo-api-ng/api/api';
import { ICompanyProfile } from './company-profile.resolver';
import { GetOrganizationDetails, GetOrganizationServiceDetails } from 'profitelo-api-ng/model/models';
import { ProfileTypes } from '../../common/components/profile/profile-header/profile-header.controller';

// tslint:disable:member-ordering
export class CompanyProfileController {

  public static $inject = ['$stateParams', '$log', 'ProfileApi', 'companyProfile'];
  public profile?: GetOrganizationDetails;
  public consultations: GetOrganizationServiceDetails[];
  public isFavourite: boolean;
  public profileType: ProfileTypes;

  constructor(private $stateParams: ICompanyProfileStateParams, private $log: ng.ILogService,
              private ProfileApi: ProfileApi, companyProfile: ICompanyProfile) {

    this.profile = companyProfile.profileWithDocuments.profile.organizationDetails;
    this.consultations = companyProfile.services;
    this.isFavourite = companyProfile.isFavourite;
    this.profileType = ProfileTypes.company;
  }

  public handleLike = (): void => {
    if (!this.isFavourite) {
      this.ProfileApi.postProfileFavouriteOrganizationRoute(this.$stateParams.profileId)
      .then(this.onProfileLike, this.onProfileLikeError);
    } else {
      this.ProfileApi.deleteProfileFavouriteOrganizationRoute(this.$stateParams.profileId)
      .then(this.onProfileDislike, this.onProfileDislikeError);
    }
  }

  private onProfileLike = (): boolean =>
    this.isFavourite = true

  private onProfileLikeError = (error: any): void =>
    this.$log.error('Can not like this company because: ' + String(error))

  private onProfileDislike = (): boolean =>
    this.isFavourite = false

  private onProfileDislikeError = (error: any): void =>
    this.$log.error('Can not dislike this company because: ' + String(error))

}
