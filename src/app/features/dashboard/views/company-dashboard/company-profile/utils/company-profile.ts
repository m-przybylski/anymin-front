import { GetSessionWithAccount } from '@anymind-ng/api';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { ICompanyConsultationDetails } from '../services/company-consultation.service';

// tslint:disable-next-line: only-arrow-functions
export function isOwnService(
  companyConsultationDetails?: ICompanyConsultationDetails,
  getUserType?: UserTypeEnum,
  getSession?: GetSessionWithAccount,
): boolean | undefined {
  if (companyConsultationDetails === undefined) {
    return undefined;
  }

  if (getSession === undefined) {
    return false;
  }

  const profileId =
    getUserType === UserTypeEnum.EXPERT
      ? getSession.session.expertProfileId
      : getUserType === UserTypeEnum.COMPANY
      ? getSession.session.organizationProfileId
      : undefined;
  if (profileId === companyConsultationDetails.serviceDetails.serviceDetails.ownerProfile.id) {
    return true;
  }

  return false;
}
