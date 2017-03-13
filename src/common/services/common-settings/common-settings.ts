import * as angular from "angular"
import {CommonSettingsService} from "./common-settings.service"
import "app/common-config"

const commonSettingsModule = angular.module('profitelo.services.commonSettings', ['commonConfig'])
  .service('CommonSettingsService', CommonSettingsService)
  .name

export default commonSettingsModule;
