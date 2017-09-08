import {CallSummary} from './CallSummary'
import {MoneyDto, GetService, Tag, GetProfile} from 'profitelo-api-ng/model/models'

export interface ClientCallSummary extends CallSummary {
	serviceUsageEventId: string
	cost: MoneyDto
	service: GetService
	tags: Tag[]
	callDuration: number
	isRecommendable: boolean
	companyExpertProfile: GetProfile
	serviceOwnerProfile: GetProfile
}
