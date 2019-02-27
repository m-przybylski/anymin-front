import { ServiceWithEmployments, EmploymentWithExpertProfile, GetService } from '@anymind-ng/api';
import { CompanyProfileApiActions, CompanyProfilePageActions } from '../actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import { IOrganizationProfile } from '../services/company-profile.service';
import { IExpertCompanyDashboardResolverData } from '../../../common/resolver-helpers';
import { ConsultationDetailActions } from '@platform/shared/components/modals/consultation-details/actions';

export interface IState extends fromRoot.IState {
  isLoading: boolean;
  organizationProfile?: IExpertCompanyDashboardResolverData<IOrganizationProfile>;
  error?: any;
}

type ActionUnion =
  | ConsultationDetailActions.ConsultationDetailsActionsUnion
  | CompanyProfileApiActions.CompanyProfileApiActionsUnion
  | CompanyProfilePageActions.CompanyProfilePageActionsUnion;

/** helper functions */
const removeEmployment = (
  employmentId: string,
  employments: ReadonlyArray<EmploymentWithExpertProfile>,
): ReadonlyArray<EmploymentWithExpertProfile> => employments.filter(employment => employment.id !== employmentId);

const updateService = (
  mapper: (arr: ReadonlyArray<ServiceWithEmployments>) => ReadonlyArray<ServiceWithEmployments>,
  organizationProfile?: IExpertCompanyDashboardResolverData<IOrganizationProfile>,
): IExpertCompanyDashboardResolverData<IOrganizationProfile> | undefined => {
  if (organizationProfile === undefined) {
    return organizationProfile;
  }

  return {
    ...organizationProfile,
    profile: {
      ...organizationProfile.profile,
      organization: {
        ...organizationProfile.profile.organization,
        services: mapper(organizationProfile.profile.organization.services),
      },
    },
  };
};

const removeExpertByEmployment = (
  employmentId: string,
): ((services: ReadonlyArray<ServiceWithEmployments>) => ReadonlyArray<ServiceWithEmployments>) => (
  services: ReadonlyArray<ServiceWithEmployments>,
): ReadonlyArray<ServiceWithEmployments> =>
  services.map(service => ({
    ...service,
    employments: removeEmployment(employmentId, service.employments),
  }));

const addConsultation = (
  consultation: GetService,
): ((services: ReadonlyArray<ServiceWithEmployments>) => ReadonlyArray<ServiceWithEmployments>) => (
  services: ReadonlyArray<ServiceWithEmployments>,
): ReadonlyArray<ServiceWithEmployments> => [...services, { service: consultation, employments: [] }];

const deleteConsultation = (
  serviceId: string,
): ((services: ReadonlyArray<ServiceWithEmployments>) => ReadonlyArray<ServiceWithEmployments>) => (
  services: ReadonlyArray<ServiceWithEmployments>,
): ReadonlyArray<ServiceWithEmployments> => services.filter(service => service.service.id !== serviceId);

const updateConsultation = (
  getService: GetService,
): ((services: ReadonlyArray<ServiceWithEmployments>) => ReadonlyArray<ServiceWithEmployments>) => (
  services: ReadonlyArray<ServiceWithEmployments>,
): ReadonlyArray<ServiceWithEmployments> =>
  services.map(service => {
    if (service.service.id === getService.id) {
      return {
        ...service,
        service: {
          ...service.service,
          ...getService,
        },
      };
    }

    return service;
  });

/** end helper functions */

const initialState: IState = { isLoading: false };

// tslint:disable-next-line:only-arrow-functions , cyclomatic-complexity
export function reducer(state: IState = initialState, action: ActionUnion): IState {
  switch (action.type) {
    case CompanyProfilePageActions.CompanyProfilePageActionTypes.Load:
    case CompanyProfilePageActions.CompanyProfilePageActionTypes.UpdateProfile:
      return {
        ...state,
        isLoading: true,
        organizationProfile: undefined,
        error: undefined,
      };
    case CompanyProfileApiActions.CompanyProfileApiActionTypes.LoadProfileActionSuccess:
      return {
        ...state,
        isLoading: false,
        organizationProfile: action.payload,
        error: undefined,
      };
    case CompanyProfileApiActions.CompanyProfileApiActionTypes.LoadProfileActionFailure:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CompanyProfileApiActions.CompanyProfileApiActionTypes.DeleteEmploymentSuccess:
      return {
        ...state,
        organizationProfile: updateService(removeExpertByEmployment(action.payload), state.organizationProfile),
      };
    case CompanyProfilePageActions.CompanyProfilePageActionTypes.AddConsultation:
      return {
        ...state,
        organizationProfile: updateService(addConsultation(action.payload), state.organizationProfile),
      };
    case ConsultationDetailActions.ConsultationDetailsActionsTypes.Delete:
      return {
        ...state,
        organizationProfile: updateService(deleteConsultation(action.payload), state.organizationProfile),
      };
    case ConsultationDetailActions.ConsultationDetailsActionsTypes.Edit:
      return {
        ...state,
        organizationProfile: updateService(updateConsultation(action.payload), state.organizationProfile),
      };
    default:
      return state;
  }
}

const companyProfile = createFeatureSelector<IState>('companyProfile');

export const getData = createSelector(
  companyProfile,
  (state): IExpertCompanyDashboardResolverData<IOrganizationProfile> | undefined => state.organizationProfile,
);

export const getProfile = createSelector(
  getData,
  (data): IOrganizationProfile | undefined => data && data.profile,
);

export const getConsultations = createSelector(
  getProfile,
  (state): ReadonlyArray<ServiceWithEmployments> | undefined => state && state.organization.services,
);
