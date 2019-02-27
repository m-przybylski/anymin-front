import * as fromRoot from '@platform/reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IExpertCompanyDashboardResolverData } from '../../../common/resolver-helpers';
import { IExpertProfile } from '../services/expert-dashboard.service';
import { ExpertDashboardActions, ExpertDashboardApiActions } from '../actions';
import { EmploymentWithService, GetService } from '@anymind-ng/api';
import { ConsultationDetailActions } from '@platform/shared/components/modals/consultation-details/actions';

const addConsultation = (
  service: EmploymentWithService,
): ((employments: ReadonlyArray<EmploymentWithService>) => ReadonlyArray<EmploymentWithService>) => (
  employments: ReadonlyArray<EmploymentWithService>,
): ReadonlyArray<EmploymentWithService> => [...employments, service];

const deleteConsultation = (
  serviceId: string,
): ((employments: ReadonlyArray<EmploymentWithService>) => ReadonlyArray<EmploymentWithService>) => (
  employments: ReadonlyArray<EmploymentWithService>,
): ReadonlyArray<EmploymentWithService> => employments.filter(employment => employment.serviceDetails.id !== serviceId);

const updateConsultation = (
  service: GetService,
): ((employments: ReadonlyArray<EmploymentWithService>) => ReadonlyArray<EmploymentWithService>) => (
  employments: ReadonlyArray<EmploymentWithService>,
): ReadonlyArray<EmploymentWithService> =>
  employments.map(employment => {
    if (employment.serviceDetails.id === service.id) {
      return {
        ...employment,
        serviceDetails: {
          ...employment.serviceDetails,
          ...service,
        },
      };
    }

    return employment;
  });

const updateProfile = (
  mapper: ((employments: ReadonlyArray<EmploymentWithService>) => ReadonlyArray<EmploymentWithService>),
  expertProfile?: IExpertCompanyDashboardResolverData<IExpertProfile>,
): IExpertCompanyDashboardResolverData<IExpertProfile> | undefined => {
  if (expertProfile === undefined) {
    return expertProfile;
  }

  return {
    ...expertProfile,
    profile: {
      ...expertProfile.profile,
      expertProfileView: {
        ...expertProfile.profile.expertProfileView,
        employments: mapper(expertProfile.profile.expertProfileView.employments),
      },
    },
  };
};

export interface IState extends fromRoot.IState {
  isLoading: boolean;
  expertProfile?: IExpertCompanyDashboardResolverData<IExpertProfile>;
  error?: any;
}

const initialState: IState = {
  isLoading: false,
};

type ActionUnion =
  | ConsultationDetailActions.ConsultationDetailsActionsUnion
  | ExpertDashboardActions.ExpertDashboardActionUnion
  | ExpertDashboardApiActions.ExpertDashboardActionUnion;

// tslint:disable-next-line:only-arrow-functions , cyclomatic-complexity
export function reducer(state = initialState, action: ActionUnion): IState {
  switch (action.type) {
    case ExpertDashboardActions.ExpertDashboardActionTypes.Load:
    case ExpertDashboardActions.ExpertDashboardActionTypes.ReloadAfterEditProfile:
      return {
        ...state,
        isLoading: true,
      };
    case ExpertDashboardApiActions.ExpertDashboardApiActionTypes.LoadSuccess:
      return {
        ...state,
        isLoading: false,
        expertProfile: action.payload,
        error: undefined,
      };
    case ExpertDashboardApiActions.ExpertDashboardApiActionTypes.LoadFailure:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ExpertDashboardActions.ExpertDashboardActionTypes.AddConsultation:
      return {
        ...state,
        expertProfile: updateProfile(addConsultation(action.payload), state.expertProfile),
      };
    case ConsultationDetailActions.ConsultationDetailsActionsTypes.Delete:
      return {
        ...state,
        expertProfile: updateProfile(deleteConsultation(action.payload), state.expertProfile),
      };
    case ConsultationDetailActions.ConsultationDetailsActionsTypes.Edit:
      return {
        ...state,
        expertProfile: updateProfile(updateConsultation(action.payload), state.expertProfile),
      };
    default:
      return state;
  }
}

const getExpertProfile = createFeatureSelector<IState>('expertProfile');
export const getIsLoading = createSelector(
  getExpertProfile,
  state => state.isLoading,
);
export const getProfileData = createSelector(
  getExpertProfile,
  state => state.expertProfile,
);
