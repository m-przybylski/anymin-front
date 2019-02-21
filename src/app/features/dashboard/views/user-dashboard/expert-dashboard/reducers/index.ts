import * as fromRoot from '@platform/reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IExpertCompanyDashboardResolverData } from '../../../common/resolver-helpers';
import { IExpertProfile } from '../services/expert-dashboard.service';
import { ExpertDashboardActions, ExpertDashboardApiActions } from '../actions';

export interface IExpertProfileState {
  isLoading: boolean;
  expertProfile?: IExpertCompanyDashboardResolverData<IExpertProfile>;
  error?: any;
}
const initialState: IExpertProfileState = {
  isLoading: false,
};

export interface IState extends fromRoot.IState {
  expertProfile: IExpertProfileState;
}

type ActionUnion =
  | ExpertDashboardActions.ExpertDashboardActionUnion
  | ExpertDashboardApiActions.ExpertDashboardActionUnion;

// tslint:disable-next-line:only-arrow-functions
export function reducer(state = initialState, action: ActionUnion): IExpertProfileState {
  switch (action.type) {
    case ExpertDashboardActions.ExpertDashboardActionTypes.Load:
    case ExpertDashboardActions.ExpertDashboardActionTypes.ReloadAfterConsultations:
    case ExpertDashboardActions.ExpertDashboardActionTypes.ReloadAfterCreateConsultation:
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
    default:
      return state;
  }
}

const getExpertProfile = createFeatureSelector<IState, IExpertProfileState>('expertProfile');
export const getIsLoading = createSelector(
  getExpertProfile,
  state => state.isLoading,
);
export const getProfileData = createSelector(
  getExpertProfile,
  state => state.expertProfile,
);
