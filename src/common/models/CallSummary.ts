import {ExpertProfile} from "./ExpertProfile"
import {Service} from "./Service"

export interface CallSummary {
  accountId: string
  serviceUsageEventId: string
  companyExpertProfile: ExpertProfile
  service: Service
}
