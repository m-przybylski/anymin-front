import { InjectionToken } from '@angular/core';

export const INCOMING_CALL: InjectionToken<IncomingCallData> = new InjectionToken<IncomingCallData>(
  'Injection token to incoming call modal',
);

export interface IncomingCallData {
  serviceName: string;
}
