import * as angular from 'angular';
import { SoundsService } from '../../../services/sounds/sounds.service';
import { TimerFactory } from '../../../services/timer/timer.factory';
import { RatelApi, ServiceApi } from 'profitelo-api-ng/api/api';
import { GetExpertSueDetails } from 'profitelo-api-ng/model/models';
import { Session } from 'ratel-sdk-js';
import { ExpertCall } from './current-expert-call';
import { MicrophoneService } from '../microphone-service/microphone.service';
import { CommunicatorService } from '@anymind-ng/core';
import { empty } from 'rxjs/observable/empty';
import { loggerServiceMock } from '../../../services/logger/logger.mock';

describe('Unit tests: current expert call', () => {

  let currentExpertCall: ExpertCall;
  let RatelApi: RatelApi;
  let q: ng.IQService;
  const microphoneService: MicrophoneService = jasmine.createSpyObj('microphoneService', ['']);

  const communicatorService: CommunicatorService = <any>{
    onActiveCall: (): void => {},
    connectionEstablishedEvent$: empty(),
    connectionLostEvent$: empty()
  };

  const timerFactory: TimerFactory = <any>{
    getInstance: (): void => {}
  };

  const session = {} as Session;

  const call = <any>{
    onAnswered: (): (cb: () => void) => void => (cb: () => void): void => {cb(); },
    onRejected: (): (cb: () => void) => void => (cb: () => void): void => {cb(); },
    onEnd: (): void => {},
    onActiveDevice: (): void => {},
    onInvited: (): void => {},
    onJoined: (): void => {},
    onLeft: (): void => {},
    onRemoteStream: (): void => {},
    onOffline: (): void => {},
    onOnline: (): void => {},
    addStream: (_localStream: MediaStream): void => {},
  };

  const incomingCallDetails: GetExpertSueDetails = <any>{
    servicePrice: 23,
    sueId: '12'
  };

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL');
    $provide.value('soundsService', SoundsService);
    $provide.value('RatelApi', RatelApi);
    $provide.value('ServiceApi', ServiceApi);
  }));

  beforeEach((inject((_RatelApi_: RatelApi,
                      _ServiceApi_: ServiceApi,
                      $q: ng.IQService) => {
    RatelApi = _RatelApi_;
    q = $q;
    currentExpertCall = new ExpertCall(incomingCallDetails, session, timerFactory, call,
       communicatorService, RatelApi, _ServiceApi_, microphoneService, loggerServiceMock);
  })));

  it('should currentExpertCall exist', () => {
    expect(currentExpertCall).toBeTruthy();
  });

});
