// tslint:disable:no-import-side-effect
// tslint:disable:no-empty-interface
// tslint:disable:no-empty-interface
import * as angular from 'angular';
import 'angular-translate';
import { ExpertNavigationComponent } from './navigation.component';
import apiModule from 'profitelo-api-ng/api.module';
import filtersModule from '../../../../filters/filters';
import promiseModule from '../../../../services/promise/promise';
import errorHandlerModule from '../../../../services/error-handler/error-handler';
import anymindWebsocketModule from '../../../../services/anymind-websocket/anymind-websocket.service';

export interface IExpertNavigationComponentBindings extends ng.IController {}

const expertNavigationModule = angular
  .module('profitelo.components.dashboard.expert.navigation', [
    'pascalprecht.translate',
    filtersModule,
    errorHandlerModule,
    apiModule,
    promiseModule,
    anymindWebsocketModule,
  ])
  .component('expertNavigation', new ExpertNavigationComponent()).name;

export default expertNavigationModule;
