import {CallSummary} from './CallSummary'
import {MoneyDto, GetService} from 'profitelo-api-ng/model/models'

export interface ExpertCallSummary extends CallSummary {
  serviceUsageEventId: string
  profit: MoneyDto
  service: GetService
  callDuration: number
}
