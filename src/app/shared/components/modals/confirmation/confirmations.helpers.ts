import { InjectionToken } from '@angular/core';

export const CONFIRMATION_DATA = new InjectionToken<IConfirmationConfig>('Data for confirmation dialog');

export interface IConfirmationConfig {
  header: string;
  modalHeader: string;
}
