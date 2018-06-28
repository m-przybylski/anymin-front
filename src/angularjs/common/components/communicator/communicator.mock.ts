// tslint:disable:no-any
// tslint:disable:deprecation
import * as angular from 'angular';
import { empty } from 'rxjs/observable/empty';

const communicatorServiceMock = (): any => ({
  getSession: (): any => ({}),
  callInvitation$: empty(),
  connectionEstablishedEvent$: empty(),
  connectionLostEvent$: empty()
});

const expertCallServiceMock = (): any => ({
  pullableCall$: empty(),
  newCall$: empty()
});

const communicatorMockModule = angular.module('profitelo.components.communicator', [])
  .service('communicatorService', communicatorServiceMock)
  .service('expertCallService', expertCallServiceMock)
  .name;

export default communicatorMockModule;
