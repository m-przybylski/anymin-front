import * as angular from 'angular'
import {SoundsService} from '../../../services/sounds/sounds.service'
import {TimerFactory} from '../../../services/timer/timer.factory'
import {RatelApi} from 'profitelo-api-ng/api/api';
import {ServiceUsageEvent, GetProfile} from 'profitelo-api-ng/model/models';
import * as RatelSdk from 'ratel-sdk-js';
import {CurrentClientCall} from './current-client-call'
import {MicrophoneService} from '../microphone-service/microphone.service'
import {CommunicatorService} from '@anymind-ng/core';
import {empty} from 'rxjs/observable/empty';
import {loggerServiceMock} from '../../../services/logger/logger.mock';

describe('Unit tests: CurrentClientCall', () => {

  let currentClientCall: CurrentClientCall
  let RatelApi: RatelApi
  let q: ng.IQService
  const microphoneService: MicrophoneService = jasmine.createSpyObj('microphoneService', [''])

  const ratelCall: RatelSdk.BusinessCall = <any>{
    onAnswered: (): (cb: () => void) => void => (cb: () => void): void => {cb()},
    onRejected: (): (cb: () => void) => void => (cb: () => void): void => {cb()},
    onEnd: (): void => {},
    onActiveDevice: (): void => {},
    onInvited: (): void => {},
    onJoined: (): void => {},
    onLeft: (): void => {},
    onRemoteStream: (): void => {},
    onOffline: (): void => {},
    onOnline: (): void => {},
    addStream: (_localStream: MediaStream): void => {},
  }
  const service = <any>{
    price: 23
  }

  const communicatorService: CommunicatorService = <any>{
    onActiveCall: (): void => {},
    connectionEstablishedEvent$: empty()
  }

  const timerFactory: TimerFactory = <any>{
    getInstance: (): void => {}
  }
  const sue: ServiceUsageEvent = <any>{
    id: '12'
  }

  const localStream: MediaStream = <any> {
    getAudioTracks: (): MediaStreamTrack[] => []
  }

  const expert: GetProfile = <any> {

  }

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
    $provide.value('soundsService', SoundsService)
    $provide.value('RatelApi', RatelApi)
  }))

  beforeEach((inject((soundsService: SoundsService,
                      _RatelApi_: RatelApi,
                      $q: ng.IQService) => {
    RatelApi = _RatelApi_
    q = $q
    currentClientCall = new CurrentClientCall(timerFactory, ratelCall, localStream,
      service, sue, soundsService, RatelApi, communicatorService, microphoneService, expert, loggerServiceMock)
  })))

  it('should currentClientCall exist', () => {
    expect(currentClientCall).toBeTruthy()
  })

})
