import { ICompanyConsultationDetails, ICompanyEmployeeRowComponent } from '../services/company-consultation.service';
import { CompanyConsultationPageActions, CompanyConsultationApiActions } from '../actions';

export interface IState {
  isLoading: boolean;
  isInviteLoading: boolean;
  organizationConsultation?: ICompanyConsultationDetails;
  pendingInvitations?: ReadonlyArray<ICompanyEmployeeRowComponent>;
  error?: any;
}

const initialState: IState = {
  isLoading: false,
  isInviteLoading: false,
};

type ActionUnion =
  | CompanyConsultationPageActions.CompanyConsultationPageActionsUnion
  | CompanyConsultationApiActions.CompanyConsultationApiActionsUnion;

// tslint:disable-next-line: cyclomatic-complexity only-arrow-functions
export function reducer(state: IState = initialState, action: ActionUnion): IState {
  switch (action.type) {
    case CompanyConsultationPageActions.CompanyConsultationPageActionTypes.Load:
      return {
        ...state,
        isLoading: true,
        isInviteLoading: true,
      };
    case CompanyConsultationPageActions.CompanyConsultationPageActionTypes.LoadInvites:
      return {
        ...state,
        isInviteLoading: true,
      };
    case CompanyConsultationPageActions.CompanyConsultationPageActionTypes.Clear:
      return {
        ...initialState,
      };
    case CompanyConsultationApiActions.CompanyConsultationApiActionTypes.DeleteEmploymentSuccess:
      return {
        ...state,
        organizationConsultation: state.organizationConsultation && {
          ...state.organizationConsultation,
          employeesList: state.organizationConsultation.employeesList.filter(
            employee => employee.id !== action.payload,
          ),
        },
      };
    case CompanyConsultationApiActions.CompanyConsultationApiActionTypes.LoadSuccess:
      return {
        ...state,
        isLoading: false,
        organizationConsultation: action.payload,
      };
    case CompanyConsultationApiActions.CompanyConsultationApiActionTypes.LoadFailure:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CompanyConsultationApiActions.CompanyConsultationApiActionTypes.LoadInvitesSuccess:
      return {
        ...state,
        isInviteLoading: false,
        pendingInvitations: action.payload,
      };
    case CompanyConsultationPageActions.CompanyConsultationPageActionTypes.DeleteInvite:
      return {
        ...state,
        pendingInvitations:
          state.pendingInvitations && state.pendingInvitations.filter(invite => invite.id !== action.payload),
      };
    default:
      return state;
  }
}

export const getData = (state: IState): ICompanyConsultationDetails | undefined => state.organizationConsultation;
export const getInvites = (state: IState): ReadonlyArray<ICompanyEmployeeRowComponent> | undefined =>
  state.pendingInvitations;
export const getIsLoading = (state: IState): boolean => state.isLoading;
export const getIsInviteLoading = (state: IState): boolean => state.isInviteLoading;
