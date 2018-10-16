import * as angular from 'angular';
import { SessionDeletedService } from './session-deleted.service';
import anymindWebsocketModule from '../anymind-websocket/anymind-websocket.service';

const sessionDeletedModule = angular
  .module('profitelo.services.session-deleted', [anymindWebsocketModule])
  .service('sessionDeletedService', SessionDeletedService).name;

export default sessionDeletedModule;
