import * as angular from 'angular';
import { UserService } from './user.service';
import sessionModule from '../session/session';
import eventsModule from '../events/events';

const userModule = angular.module('profitelo.services.user', [
  sessionModule,
  eventsModule
])
  .service('userService', UserService)
  .name;

export default userModule;
