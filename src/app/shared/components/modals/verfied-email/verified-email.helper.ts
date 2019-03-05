import { InjectionToken } from '@angular/core';

export const VERIFIED_EMAIL_MODAL_DATA = new InjectionToken<IVerifiedEmailModalConfig>(
  'Data for verified email dialog',
);

export interface IVerifiedEmailModalConfig {
  modalContentTr: string;
  modalHeaderTr: string;
}
