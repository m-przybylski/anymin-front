import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromCore from '@platform/core/reducers';
import * as fromOrganizationProfile from './organization-profile';
import * as fromOrganizationConsultation from './organization-consultation';
import { isOwnService } from '../utils/company-profile';

export interface IOrganizationState extends fromRoot.IState {
  organizationProfile: fromOrganizationProfile.IState;
  organizationConsultation: fromOrganizationConsultation.IState;
}
export const reducers: ActionReducerMap<IOrganizationState, any> = {
  organizationProfile: fromOrganizationProfile.reducer,
  organizationConsultation: fromOrganizationConsultation.reducer,
};
const companyProfile = createFeatureSelector<IOrganizationState>('company');
const getProfile = createSelector(
  companyProfile,
  state => state.organizationProfile,
);
const getConsultation = createSelector(
  companyProfile,
  state => state.organizationConsultation,
);
export const getConsultations = createSelector(
  getProfile,
  fromOrganizationProfile.getConsultations,
);
export const getIsProfileLoading = createSelector(
  getProfile,
  fromOrganizationProfile.getIsLoading,
);
export const getProfileData = createSelector(
  getProfile,
  fromOrganizationProfile.getData,
);
export const getConsultationData = createSelector(
  getConsultation,
  fromOrganizationConsultation.getData,
);
export const getIsConsultationLoading = createSelector(
  getProfile,
  fromOrganizationConsultation.getIsLoading,
);
export const getConsultationInvites = createSelector(
  getConsultation,
  fromOrganizationConsultation.getInvites,
);
export const getIsInviteLoading = createSelector(
  getConsultation,
  fromOrganizationConsultation.getIsInviteLoading,
);
export const getIsOwnService = createSelector(
  getConsultationData,
  fromCore.getUserType,
  fromCore.getSession,
  isOwnService,
);
