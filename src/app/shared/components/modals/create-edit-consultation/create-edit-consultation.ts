import { InjectionToken } from '@angular/core';
import { ICreateEditConsultationPayload } from './create-edit-consultation.component';

export const CONSULTATION_DETAILS: InjectionToken<ICreateEditConsultationPayload> = new InjectionToken(
  'Consultation Details provided to create edit consultation',
);
