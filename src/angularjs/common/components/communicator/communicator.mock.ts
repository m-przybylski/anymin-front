import * as angular from 'angular';
import { empty } from 'rxjs/observable/empty';

const communicatorServiceMock = (): any => ({
  getSession: (): any => ({}),
  onCallInvitation: (cb: any): void => cb(),
  connectionEstablishedEvent$: empty(),
  connectionLostEvent$: empty()
})

const clientCallServiceMock = (): any => ({
  callServiceId: (): any => Promise.resolve(null)
})

const expertCallServiceMock = (): any => ({})

const communicatorMockModule = angular.module('profitelo.components.communicator', [])
  .service('communicatorService', communicatorServiceMock)
  .service('clientCallService', clientCallServiceMock)
  .service('expertCallService', expertCallServiceMock)
  .name

export default communicatorMockModule;
