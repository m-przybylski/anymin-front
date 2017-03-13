import * as angular from "angular"
import {ClientActivitiesService} from "./client-activities.service"
import apiModule from "../../api/api.module"
import sessionModule from "../session/session"

const clientActivitesModule = angular.module('profitelo.services.client-activities-service', [
  apiModule,
  sessionModule
])
  .service('clientActivitiesService', ClientActivitiesService)
  .name

export default clientActivitesModule
