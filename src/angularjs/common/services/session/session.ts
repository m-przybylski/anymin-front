import * as angular from 'angular'
import {SessionServiceWrapper} from './session.service'
import apiModule from 'profitelo-api-ng/api.module'
import eventsModule from '../events/events';

const sessionModule = angular.module('profitelo.services.session', [
  apiModule,
  eventsModule
])
  .service('sessionServiceWrapper', SessionServiceWrapper)
  .name;

export default sessionModule;
