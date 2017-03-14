import * as angular from "angular"
import {CommonSettingsService} from "./common-settings.service"
import commonConfigModule from "../../../../generated_modules/common-config/common-config"

const commonSettingsModule = angular.module('profitelo.services.commonSettings', [
  commonConfigModule
])
  .service('CommonSettingsService', CommonSettingsService)
  .name

export default commonSettingsModule;
