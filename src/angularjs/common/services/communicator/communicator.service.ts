import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';
import { CommunicatorService } from '@anymind-ng/core';

const communicatorModule = angular
  .module('profitelo.services.anymind-communicator', [])
  .service('communicatorService', downgradeInjectable(CommunicatorService)).name;

export default communicatorModule;
