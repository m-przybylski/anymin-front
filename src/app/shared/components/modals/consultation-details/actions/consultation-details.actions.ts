// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { GetService } from '@anymind-ng/api';

export enum ConsultationDetailsActionsTypes {
  Delete = '[Consultation details] delete',
  Edit = '[Consultation details] edit',
  Leave = '[Consultation details] leave',
}

export class DeleteConsultationAction implements Action {
  public readonly type = ConsultationDetailsActionsTypes.Delete;
  constructor(public payload: string) {}
}

export class EditConsultationAction implements Action {
  public readonly type = ConsultationDetailsActionsTypes.Edit;
  constructor(public payload: GetService) {}
}

export class AddConsultationAction implements Action {
  public readonly type = ConsultationDetailsActionsTypes.Edit;
  constructor(public payload: GetService) {}
}

export class ConsultationLeave implements Action {
  public readonly type = ConsultationDetailsActionsTypes.Leave;
  constructor(public payload: string) {}
}

export type ConsultationDetailsActionsUnion =
  | DeleteConsultationAction
  | EditConsultationAction
  | AddConsultationAction
  | ConsultationLeave;
