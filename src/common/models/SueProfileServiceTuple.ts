import {ExpertProfile} from "./ExpertProfile"
import {Service} from "./Service"
import {ServiceUsageEvent} from "../api/model/ServiceUsageEvent"

export interface SueProfileServiceTuple {
  serviceUsageEvent: ServiceUsageEvent
  profile: ExpertProfile
  service: Service
}
