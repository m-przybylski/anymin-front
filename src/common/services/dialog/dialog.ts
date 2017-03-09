import * as angular from "angular"
import {DialogService} from "./dialog.service"
import "angular-ui-bootstrap"

const dialogModule = angular.module('profitelo.services.dialog', [
  'ui.bootstrap'
])
  .service('dialogService', DialogService)
  .name

export default dialogModule;
