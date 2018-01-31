import {
  IExpertCallSummary
} from './ExpertCallSummary';
import {
  IClientCallSummary
} from './ClientCallSummary';

export type CallSummary = IExpertCallSummary | IClientCallSummary;

export interface ICallSummaryWebsocketObject {
  callSummary: CallSummary;
}
