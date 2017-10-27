import * as angular from 'angular'
import {SoundsService} from '../../../services/sounds/sounds.service'
import {TimerFactory} from '../../../services/timer/timer.factory'
import {RatelApi} from 'profitelo-api-ng/api/api';
import {ServiceUsageEvent, GetProfile} from 'profitelo-api-ng/model/models';
import * as RatelSdk from 'ratel-sdk-js';
import {CallbacksFactory} from '../../../services/callbacks/callbacks.factory'
import callbacksModule from '../../../services/callbacks/callbacks'
import {CommunicatorService} from '../communicator.service'
import {CurrentClientCall} from './current-client-call'

describe('Unit tests: CurrentCall', () => {

  let currentClientCall: CurrentClientCall
  let RatelApi: RatelApi
  let q: ng.IQService
  const callbacksFactory: CallbacksFactory = <CallbacksFactory>{
    getInstance:(_keys: string[]) => {
      return  <any>{
        methods: {
          onEnd: (cb: () => void) => {cb()},
          onRejected: (cb: () => void) => {cb()},
          onRemoteStream: (cb: () => void) => {cb()},
          onParticipantOnline: (cb: () => void) => {cb()},
          onParticipantOffline: (cb: () => void) => {cb()},
          onVideoStart: (cb: () => void) => {cb()},
          onVideoStop: (cb: () => void) => {cb()},
          onCallTaken: (cb: () => void) => {cb()},
          onSuspendedCallEnd: (cb: () => void) => {cb()},
          onTimeCostChange: (cb: () => void) => {cb()},
          onAnswered: (cb: () => void) => {cb()}
        }
      }
    }
  }

  const ratelCall: RatelSdk.BusinessCall = <any>{
    onAnswered: () => (cb: () => void) => {cb()},
    onRejected: () => (cb: () => void) => {cb()},
    onEnd: () => {},
    onActiveDevice: () => {},
    onInvited: () => {},
    onJoined: () => {},
    onLeft: () => {},
    onRemoteStream: () => {},
    onOffline: () => {},
    onOnline: () => {},
    addStream: (_localStream: MediaStream) => {},
  }
  const service = <any>{
    price: 23
  }

  const communicatorService: CommunicatorService = <any>{
    onReconnectActiveCalls: () => {}
  }

  const timerFactory: TimerFactory = <any>{
    getInstance: () => {}
  }
  const sue: ServiceUsageEvent = <any>{
    id: '12'
  }

  const localStream: MediaStream = <any> {
  }

  const expert: GetProfile = <any> {

  }

  beforeEach(() => {
    angular.mock.module(callbacksModule)
  })

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
    currentClientCall = new CurrentClientCall(timerFactory, callbacksFactory, ratelCall, localStream,
      service, sue, soundsService, RatelApi, communicatorService, expert)
  })))

  it('should currentClientCall exist', () => {
    expect(currentClientCall).toBeTruthy()
  })

  it('should call callback onRejected function called', () => {
    const callBack = jasmine.createSpy('callBack', () => {})
    currentClientCall.onRejected(callBack)
    expect(callBack).toHaveBeenCalled()
  })

  it('should call callback onAnswered function called', () => {
    const callBack = jasmine.createSpy('callBack', () => {})
    currentClientCall.onAnswered(callBack)
    expect(callBack).toHaveBeenCalled()
  })

})
