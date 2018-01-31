import * as angular from 'angular';
import { EventsService } from './events.service';

const eventsModule = angular.module('profitelo.services.events', [
])
.service('eventsService', EventsService)
  .name;

export default eventsModule;
