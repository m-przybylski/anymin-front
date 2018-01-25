import * as angular from 'angular'
import {SoundsService} from '../../../services/sounds/sounds.service'
import {TimerFactory} from '../../../services/timer/timer.factory'
import {RatelApi} from 'profitelo-api-ng/api/api';
import {GetIncomingCallDetails} from 'profitelo-api-ng/model/models';
import * as RatelSdk from 'ratel-sdk-js';
import {CurrentExpertCall} from './current-expert-call'
import {MicrophoneService} from '../microphone-service/microphone.service'
import {CommunicatorService} from '@anymind-ng/core';

describe('Unit tests: current expert call', () => {

  let currentExpertCall: CurrentExpertCall
  let RatelApi: RatelApi
  let q: ng.IQService
  const microphoneService: MicrophoneService = jasmine.createSpyObj('microphoneService', [''])

  const communicatorService: CommunicatorService = <any>{
    onActiveCall: (): void => {}
  }

  const timerFactory: TimerFactory = <any>{
    getInstance: (): void => {}
  }

  const callInvitation: RatelSdk.events.CallInvitation = <any>{
    call: <any>{
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
  }

  const incomingCallDetails: GetIncomingCallDetails = <any>{
    service: <any>{
      price: 23
    },
    sue: <any>{
      id: '12'
    }
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
    currentExpertCall = new CurrentExpertCall(incomingCallDetails, timerFactory, callInvitation.call,
       soundsService, communicatorService, RatelApi, microphoneService)
  })))

  it('should currentExpertCall exist', () => {
    expect(currentExpertCall).toBeTruthy()
  })

})
