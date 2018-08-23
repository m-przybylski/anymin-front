import { InjectionToken } from '@angular/core';

export const expertsLimitToken: InjectionToken<number> = new InjectionToken<number>(
  'Injection token to configure number or experts',
);
