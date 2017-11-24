import {CurrentCall} from './current-call'
import * as angular from 'angular'
import {SoundsService} from '../../../services/sounds/sounds.service'
import {TimerFactory} from '../../../services/timer/timer.factory'
import {RatelApi} from 'profitelo-api-ng/api/api';
import {ServiceUsageEvent} from 'profitelo-api-ng/model/models';
import * as RatelSdk from 'ratel-sdk-js';
import {roomType} from 'ratel-sdk-js'
import {CommunicatorService} from '../communicator.service'

describe('Unit tests: CurrentCall', () => {

  let currentCall: CurrentCall
  let RatelApi: RatelApi
  let q: ng.IQService

  const ratelCall: RatelSdk.BusinessCall = <any>{
    onAnswered: () => {},
    onRejected: () => {},
    onEnd: () => {},
    onActiveDevice: () => {},
    onInvited: () => {},
    onJoined: () => {},
    onLeft: () => {},
    onRemoteStream: () => {},
    onOffline: () => {},
    onOnline: () => {}
  }
  const service = <any>{
    price: 23
  }

  const communicatorService: CommunicatorService = <any>{
    onActiveCall: () => {}
  }

  const businessRoom: RatelSdk.BusinessRoom = <any>{
    roomType: roomType.RoomType.BUSINESS,
    onTyping: () => {},
    onMark: () => {},
    onCustom: () => {},
    onInvited: () => {},
    join: () => {}
  }
  const timerFactory: TimerFactory = <any>{
    getInstance: () => {}
  }
  const sue: ServiceUsageEvent = <any>{
    id: '12'
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
    currentCall = new CurrentCall(soundsService, ratelCall, timerFactory, service, sue, communicatorService, RatelApi)
  })))

  it('should currentCall exist', () => {
    expect(currentCall).toBeTruthy()
  })

  it('should return service', () => {
    expect(currentCall.getService()).toEqual(service)
  })

  it('should return sue id', () => {
    expect(currentCall.getSueId()).toEqual(sue.id)
  })

  it('should return existing message room', () => {
    expect(currentCall.getMessageRoom()).toBeTruthy()
  })

  it('should call join room method', () => {
    spyOn(businessRoom, 'join')
    currentCall.setBusinessRoom(businessRoom)
    expect(businessRoom.join).toHaveBeenCalled()
  })
})
