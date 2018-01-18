import * as angular from 'angular'

const communicatorServiceMock = (): any => ({
  getClientSession: (): any => ({}),
  onCallInvitation: (cb: any): void => cb()
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
