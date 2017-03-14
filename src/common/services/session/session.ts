import * as angular from "angular"
import {SessionService} from "./session.service"
import apiModule from "profitelo-api-ng/api.module"

const sessionModule = angular.module('profitelo.services.session', [
  apiModule
])
  .service('sessionService', SessionService)
  .name;

export default sessionModule;
