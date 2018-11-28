// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { ServiceWithEmployments } from '@anymind-ng/api';

export enum CompanyProfileApiActionTypes {
  LoadCompanyConsultationsSuccess = '[Comp profile API] Load consultations Success',
  LoadCompanyConsultationsFailure = '[Comp profile API] Load consultations Failure',
  DeleteEmploymentSuccess = '[Comp profile API] Delete employment Success',
  DeleteEmploymentFailure = '[Comp profile API] Delete employment Failure',
}

export class LoadCompanyConsultationsSuccessAction implements Action {
  public readonly type = CompanyProfileApiActionTypes.LoadCompanyConsultationsSuccess;
  constructor(public payload: ReadonlyArray<ServiceWithEmployments>) {}
}

export class DeleteEmploymentSuccessAction implements Action {
  public readonly type = CompanyProfileApiActionTypes.DeleteEmploymentSuccess;
  constructor(public payload: string) {}
}
export type CompanyProfileApiActionsUnion = LoadCompanyConsultationsSuccessAction | DeleteEmploymentSuccessAction;
