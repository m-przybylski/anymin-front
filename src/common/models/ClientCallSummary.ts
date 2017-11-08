import {MoneyDto, Tag, GetProfile, GetService} from 'profitelo-api-ng/model/models'

export interface ClientCallSummary {
	serviceUsageEventId: string
	cost: MoneyDto
	tags: {
    serviceId: string,
    tags: Tag[]
  }
	isRecommendable: boolean
	companyExpertProfile: GetProfile
	serviceOwnerProfile: GetProfile
  callDuration: number
  service: GetService
}
