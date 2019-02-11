/** If you are check this MR I'm using readonly arrays */
// tslint:disable:readonly-array
import { ServiceWithEmployments, EmploymentWithExpertProfile } from '@anymind-ng/api';
import { CompanyProfileApiActions } from '../actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';

export interface ICompanyProfileState extends fromRoot.IState {
  companyProfile: IState;
}

export interface IState {
  consultations: ReadonlyArray<ServiceWithEmployments>;
}

type ActionUnion = CompanyProfileApiActions.CompanyProfileApiActionsUnion;

/** helper functions */
const removeEmployment = (
  employmentId: string,
  employments: ReadonlyArray<EmploymentWithExpertProfile>,
): EmploymentWithExpertProfile[] => employments.filter(employment => employment.id !== employmentId);

const removeExpertByEmployment = (
  employmentId: string,
  consultations: ReadonlyArray<ServiceWithEmployments>,
): ServiceWithEmployments[] =>
  consultations.map(consultation => ({
    ...consultation,
    employments: removeEmployment(employmentId, consultation.employments),
  }));

/** end helper functions */

const initialState: IState = { consultations: [] };

// tslint:disable-next-line:only-arrow-functions
export function reducer(state: IState = initialState, action: ActionUnion): IState {
  switch (action.type) {
    case CompanyProfileApiActions.CompanyProfileApiActionTypes.LoadCompanyConsultationsSuccess:
      return {
        ...state,
        consultations: [...action.payload],
      };
    case CompanyProfileApiActions.CompanyProfileApiActionTypes.DeleteEmploymentSuccess:
      return {
        ...state,
        consultations: removeExpertByEmployment(action.payload, state.consultations),
      };
    default:
      return state;
  }
}

export const companyProfile = createFeatureSelector<ICompanyProfileState, IState>('companyProfile');

export const getConsultations = createSelector(
  companyProfile,
  (state): ReadonlyArray<ServiceWithEmployments> => state.consultations,
);
