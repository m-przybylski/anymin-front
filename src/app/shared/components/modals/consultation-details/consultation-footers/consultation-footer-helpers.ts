import { MoneyDto, GetDefaultPaymentMethod, GetCreditCard, ServiceWithOwnerProfile } from '@anymind-ng/api';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultationDetailsActionsService } from '@platform/shared/components/modals/consultation-details/consultation-details-actions.service';

export const CONSULTATION_FOOTER_DATA = new InjectionToken<IConsultationFooterData>('Footer data');

export interface IConsultationFooterData {
  ownerId: string;
  expertsIdList: ReadonlyArray<string>;
  isExpertAvailable: boolean;
  userId?: string;
  isFreelance: boolean;
  price?: MoneyDto;
  vatRateType?: ServiceWithOwnerProfile.VatRateTypeEnum;
  creditCards: ReadonlyArray<GetCreditCard>;
  defaultPaymentMethod: GetDefaultPaymentMethod;
}

// tslint:disable:readonly-array
// tslint:disable:no-any
export type FooterComponentConstructor = new (data: IConsultationFooterData, ...args: any[]) => IFooterOutput;

// tslint:disable-next-line:max-classes-per-file
export interface IFooterOutput {
  actionTaken$: Observable<keyof ConsultationDetailsActionsService>;
}
