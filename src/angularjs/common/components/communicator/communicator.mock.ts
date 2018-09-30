// tslint:disable:no-any
import * as angular from 'angular';
import { EMPTY } from 'rxjs';

const communicatorServiceMock = (): any => ({
  getSession: (): any => ({}),
  callInvitation$: EMPTY,
  connectionEstablishedEvent$: EMPTY,
  connectionLostEvent$: EMPTY,
});

const expertCallServiceMock = (): any => ({
  pullableCall$: EMPTY,
  newCall$: EMPTY,
});

const communicatorMockModule = angular
  .module('profitelo.components.communicator', [])
  .service('communicatorService', communicatorServiceMock)
  .service('expertCallService', expertCallServiceMock).name;

export default communicatorMockModule;
