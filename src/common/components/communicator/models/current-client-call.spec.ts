import * as angular from 'angular'
import {SoundsService} from '../../../services/sounds/sounds.service'
import {TimerFactory} from '../../../services/timer/timer.factory'
import {RatelApi} from 'profitelo-api-ng/api/api';
import {ServiceUsageEvent, GetProfile} from 'profitelo-api-ng/model/models';
import * as RatelSdk from 'ratel-sdk-js';
import {CommunicatorService} from '../communicator.service'
import {CurrentClientCall} from './current-client-call'

describe('Unit tests: CurrentCall', () => {

  let currentClientCall: CurrentClientCall
  let RatelApi: RatelApi
  let q: ng.IQService

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
      service, sue, soundsService, RatelApi, communicatorService, expert)
  })))

  it('should currentClientCall exist', () => {
    expect(currentClientCall).toBeTruthy()
  })

})
