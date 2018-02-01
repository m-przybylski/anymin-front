import { CurrentCall } from './current-call';
import * as angular from 'angular';
import { SoundsService } from '../../../services/sounds/sounds.service';
import { TimerFactory } from '../../../services/timer/timer.factory';
import { RatelApi } from 'profitelo-api-ng/api/api';
import { ServiceUsageEvent } from 'profitelo-api-ng/model/models';
import * as RatelSdk from 'ratel-sdk-js';
import { roomType, Session } from 'ratel-sdk-js';
import { MicrophoneService } from '../microphone-service/microphone.service';
import { CommunicatorService } from '@anymind-ng/core';
import { empty } from 'rxjs/observable/empty';
import { loggerServiceMock } from '../../../services/logger/logger.mock';
import { TimerService } from '../../../services/timer/timer.service';

describe('Unit tests: CurrentCall', () => {

  let currentCall: CurrentCall;
  let RatelApi: RatelApi;
  let q: ng.IQService;
  const microphoneService: MicrophoneService = jasmine.createSpyObj('microphoneService', ['']);

  const ratelCall: RatelSdk.BusinessCall = <any>{
    onAnswered: (): void => {},
    onRejected: (): void => {},
    onEnd: (): void => {},
    onActiveDevice: (): void => {},
    onInvited: (): void => {},
    onJoined: (): void => {},
    onLeft: (): void => {},
    onRemoteStream: (): void => {},
    onOffline: (): void => {},
    onOnline: (): void => {}
  };
  const service = <any>{
    price: 23
  };

  // tslint:disable:no-object-literal-type-assertion
  const session: Session = {} as Session;

  const communicatorService: CommunicatorService = <any>{
    onActiveCall: (): void => {},
    connectionEstablishedEvent$: empty(),
    connectionLostEvent$: empty()
  };

  const businessRoom: RatelSdk.BusinessRoom = <any>{
    roomType: roomType.RoomType.BUSINESS,
    onTyping: (): void => {},
    onMarked: (): void => {},
    onCustom: (): void => {},
    onInvited: (): void => {},
    join: (): Promise<{}> => Promise.resolve({})
  };

  const timerInstance: TimerService = {
    pause: (): void => {}
  } as TimerService;

  const timerFactory: TimerFactory = <any>{
    getInstance: (): TimerService => timerInstance
  };

  const sue: ServiceUsageEvent = <any>{
    id: '12'
  };

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL');
    $provide.value('soundsService', SoundsService);
    $provide.value('RatelApi', RatelApi);
  }));

  beforeEach((inject((_RatelApi_: RatelApi,
                      $q: ng.IQService) => {
    RatelApi = _RatelApi_;
    q = $q;
    currentCall = new CurrentCall(ratelCall, session, timerFactory, service, sue, communicatorService,
      RatelApi, microphoneService, loggerServiceMock);
  })));

  it('should reject promise while starting environment video', (done) => {
    currentCall.startEnvironmentVideo()
      .then()
      .catch((err) => expect(err).toBe('No streamManager'))
      .then(done);
  });

  it('should reject promise while starting video', (done) => {
    currentCall.startVideo()
      .then()
      .catch((err) => expect(err).toBe('No streamManager'))
      .then(done);
  });

  it('should reject promise while starting audio', (done) => {
    currentCall.startAudio()
      .then()
      .catch((err) => expect(err).toBe('No streamManager'))
      .then(done);
  });

  it('should reject promise while stoping video', (done) => {
    currentCall.stopVideo()
      .then()
      .catch((err) => expect(err).toBe('No streamManager'))
      .then(done);
  });

  it('should currentCall exist', () => {
    expect(currentCall).toBeTruthy();
  });

  it('should return service', () => {
    expect(currentCall.getService()).toEqual(service);
  });

  it('should return sue id', () => {
    expect(currentCall.getSueId()).toEqual(sue.id);
  });

  it('should call join room method', () => {
    spyOn(businessRoom, 'join').and.returnValue(Promise.resolve({}));
    currentCall.joinRoom(businessRoom);
    expect(businessRoom.join).toHaveBeenCalled();
  });
});
