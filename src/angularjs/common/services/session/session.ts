import * as angular from 'angular';
import { SessionServiceWrapper } from './session.service';
import apiModule from 'profitelo-api-ng/api.module';
import eventsModule from '../events/events';
import { UserSessionService } from '../../../../app/core/services/user-session/user-session.service';
import { downgradeInjectable } from '@angular/upgrade/static';

const sessionModule = angular.module('profitelo.services.session', [
  apiModule,
  eventsModule
])
  .service('sessionServiceWrapper', SessionServiceWrapper)
  .service('userSessionService', downgradeInjectable(UserSessionService))
  .name;

export default sessionModule;
