import * as angular from 'angular'
import {SoundsService} from '../../../services/sounds/sounds.service'
import {TimerFactory} from '../../../services/timer/timer.factory'
import {RatelApi} from 'profitelo-api-ng/api/api';
import {GetIncomingCallDetails} from 'profitelo-api-ng/model/models';
import * as RatelSdk from 'ratel-sdk-js';
import {CallbacksFactory} from '../../../services/callbacks/callbacks.factory'
import callbacksModule from '../../../services/callbacks/callbacks'
import {CommunicatorService} from '../communicator.service'
import {CurrentExpertCall} from './current-expert-call'

describe('Unit tests: CurrentCall', () => {

  let currentExpertCall: CurrentExpertCall
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
  const communicatorService: CommunicatorService = <any>{
    onReconnectActiveCalls: () => {}
  }

  const timerFactory: TimerFactory = <any>{
    getInstance: () => {}
  }

  beforeEach(() => {
    angular.mock.module(callbacksModule)
  })

  const callInvitation: RatelSdk.events.CallInvitation = <any>{
    call: <any>{
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
    currentExpertCall = new CurrentExpertCall(timerFactory, callbacksFactory, callInvitation, incomingCallDetails,
       soundsService, communicatorService, RatelApi)
  })))

  it('should currentExpertCall exist', () => {
    expect(currentExpertCall).toBeTruthy()
  })


})
