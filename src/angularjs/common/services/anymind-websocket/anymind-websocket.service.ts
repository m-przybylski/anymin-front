import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';

const anymindWebsocketModule = angular
  .module('profitelo.services.anymind-websocket', [])
  .service('anymindWebsocket', downgradeInjectable(AnymindWebsocketService)).name;

export default anymindWebsocketModule;
