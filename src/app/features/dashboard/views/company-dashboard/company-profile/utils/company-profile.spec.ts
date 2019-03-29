import { isOwnService } from './company-profile';
import { ICompanyConsultationDetails } from '../services/company-consultation.service';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { DeepPartial } from 'testing/testing';

describe('Company profile utils', () => {
  let companyConsultationDetails: DeepPartial<ICompanyConsultationDetails> | undefined;
  let getUserType: UserTypeEnum | undefined;
  let getSession: DeepPartial<GetSessionWithAccount> | undefined;
  beforeEach(() => {
    companyConsultationDetails = undefined;
    getUserType = undefined;
    getSession = undefined;
  });
  it('should return undefined for empty company details', () => {
    expect(isOwnService()).toBe(undefined);
  });
  it('should return false for empty session', () => {
    expect(isOwnService('fake consultation details' as any)).toBe(false);
  });
  it('should return true if ownerId equals expertId for expert user Type', () => {
    companyConsultationDetails = {
      serviceDetails: {
        serviceDetails: {
          ownerProfile: {
            id: 'fake expert Id',
          },
        },
      },
    };
    getSession = {
      session: {
        expertProfileId: 'fake expert Id',
        organizationProfileId: 'fake organization Id',
      },
    };
    getUserType = UserTypeEnum.EXPERT;
    expect(isOwnService(companyConsultationDetails as any, getUserType, getSession as any)).toBe(true);
  });
  it('should return true if ownerId equals organizationId for company user Type', () => {
    companyConsultationDetails = {
      serviceDetails: {
        serviceDetails: {
          ownerProfile: {
            id: 'fake organization Id',
          },
        },
      },
    };
    getSession = {
      session: {
        expertProfileId: 'fake expert Id',
        organizationProfileId: 'fake organization Id',
      },
    };
    getUserType = UserTypeEnum.COMPANY;
    expect(isOwnService(companyConsultationDetails as any, getUserType, getSession as any)).toBe(true);
  });
  it('should return false if ownerId equals organizationId for expert user Type', () => {
    companyConsultationDetails = {
      serviceDetails: {
        serviceDetails: {
          ownerProfile: {
            id: 'fake organization Id',
          },
        },
      },
    };
    getSession = {
      session: {
        expertProfileId: 'fake expert Id',
        organizationProfileId: 'fake organization Id',
      },
    };
    getUserType = UserTypeEnum.EXPERT;
    expect(isOwnService(companyConsultationDetails as any, getUserType, getSession as any)).toBe(false);
  });
  it('should return false user type USER', () => {
    companyConsultationDetails = {
      serviceDetails: {
        serviceDetails: {
          ownerProfile: {
            id: 'fake id',
          },
        },
      },
    };
    getSession = {
      session: {
        expertProfileId: 'fake expert Id',
        organizationProfileId: 'fake organization Id',
      },
    };
    getUserType = UserTypeEnum.USER;
    expect(isOwnService(companyConsultationDetails as any, getUserType, getSession as any)).toBe(false);
  });
});
