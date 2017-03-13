import {Profile} from "./Profile"
import {ExpertDetails} from "./ExpertDetails"

export interface ExpertProfile extends Profile {
  expertDetails: ExpertDetails
}
