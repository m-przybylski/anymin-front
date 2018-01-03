import {MoneyDto, GetService} from 'profitelo-api-ng/model/models'

interface IAccountSettings {
  nickname: string
  avatar: string
}

export interface IExpertCallSummary {
  serviceUsageEventId: string
  profit: MoneyDto
  callDuration: number
  service: GetService
  clientAccountSettings?: IAccountSettings
}
