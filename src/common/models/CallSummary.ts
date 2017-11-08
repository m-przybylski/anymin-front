import {
  ExpertCallSummary
} from './ExpertCallSummary'
import {
  ClientCallSummary
} from './ClientCallSummary'

export type CallSummary = ExpertCallSummary | ClientCallSummary

export interface CallSummaryWebsocketObject {
  callSummary: CallSummary
}
