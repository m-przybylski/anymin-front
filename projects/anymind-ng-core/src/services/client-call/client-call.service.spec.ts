// tslint:disable:max-file-line-count
import { CallFactory } from '../call.factory';
import { RatelService } from '@anymind-ng/api';
import { TestBed, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';
import { Deceiver } from 'deceiver-core';
import { provideMockFactoryLogger } from 'testing/testing';
import { ClientCallService } from './client-call.service';
import { Subject, of, throwError } from 'rxjs';
import { CommunicatorService } from '../communicator.service';
import { SoundsService } from '../sounds.service';
import { AlertService } from '../alert/alert.service';
import { NavigatorWrapper } from '../models/navigator-wrapper';
import { CurrentClientCall } from '../call/current-client-call';

describe('ClientCallService', () => {
  // streams:
  const connectionEstablishedEvent = new Subject<any>();
  let callDestroyed: Subject<any>;
  let answered: Subject<any>;
  let roomInvitationEvent: Subject<any>;

  let clientCallService: ClientCallService;
  let communicatorService: CommunicatorService;
  let callFactory: CallFactory;
  let ratelService: RatelService;
  let navigatorWrapper: NavigatorWrapper;
  let callObj: any;

  const play = jest.fn();
  const stop = jest.fn();

  const fakePlay = (): any => ({ play, stop });
  const fakeSoundService = Deceiver(SoundsService, {
    callConnectingSound: fakePlay,
    callIncomingSound: fakePlay,
    playCallEnded: fakePlay,
    playCallRejected: fakePlay,
    playMessageNew: fakePlay,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClientCallService,
        {
          provide: CommunicatorService,
          useValue: Deceiver(CommunicatorService, {
            connectionEstablishedEvent$: ((): Subject<any> => connectionEstablishedEvent)(),
          }),
        },
        {
          provide: CallFactory,
          useValue: Deceiver(CallFactory),
        },
        {
          provide: SoundsService,
          useValue: fakeSoundService,
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService),
        },
        {
          provide: RatelService,
          useValue: Deceiver(RatelService),
        },
        {
          provide: NavigatorWrapper,
          useValue: Deceiver(NavigatorWrapper),
        },
        provideMockFactoryLogger(),
      ],
    });
  });

  beforeEach(() => {
    // mock sterams
    callDestroyed = new Subject<any>();
    answered = new Subject<any>();
    roomInvitationEvent = new Subject();

    communicatorService = TestBed.get(CommunicatorService);
    callFactory = TestBed.get(CallFactory);
    ratelService = TestBed.get(RatelService);
    clientCallService = TestBed.get(ClientCallService);
    navigatorWrapper = TestBed.get(NavigatorWrapper);

    // mock execution
    navigatorWrapper.getUserMediaStream = jest.fn(() =>
      Promise.resolve({
        getTracks: jest.fn(() => ({
          kind: 'fake audio',
          stop: jest.fn(),
        })),
      }),
    );

    (communicatorService.roomInvitationEvent$ as any) = roomInvitationEvent;

    ratelService.postCreateCallRoute = jest.fn(() =>
      of({
        callDetails: {
          id: 'fake id',
        },
        expert: {},
      }),
    );

    ratelService.postStartCallRoute = jest.fn(() => of({}));

    callObj = {
      callDestroyed$: callDestroyed,
      answered$: answered,
      getSueId: jest.fn(),
      joinRoom: jest.fn(() => Promise.resolve()),
      getState: jest.fn(() => 'fake state'),
    };
    callFactory.createClientCall = jest.fn(() => Promise.resolve(callObj));

    //restart calls
    play.mockReset();
    stop.mockReset();
  });

  it('should be create', () => {
    expect(clientCallService).toBeTruthy();
  });

  describe('with communication service connection established', () => {
    beforeEach(() => {
      connectionEstablishedEvent.next({
        hello: {
          deviceId: 'fake device',
        },
        session: {
          machoke: {
            getPrestartedCall: jest.fn(() => Promise.resolve()),
            getRoom: jest.fn(() => Promise.resolve('fake room')),
          },
        },
      });
    });
    it('should create call and return instance', fakeAsync(() => {
      const callPromise = clientCallService.callServiceId('😍', '🤵');
      callPromise.then(call => {
        expect(call).toBe(callObj);
        expect(clientCallService.isCallInProgress()).toBeTruthy();
      });
      flushMicrotasks();
    }));
    it('should reject call when call is ongoing', fakeAsync(() => {
      clientCallService.callServiceId('😍', '🤵');
      const callPromise = clientCallService.callServiceId('😍', '🤵');
      callPromise.catch(() => {
        expect(1).toBe(1);
      });
      flushMicrotasks();
    }));
    it('should reject call when no service provided', fakeAsync(() => {
      const callPromise = clientCallService.callServiceId('', '🤵');
      callPromise.catch(() => {
        expect(1).toBe(1);
      });
      flushMicrotasks();
    }));
    it('should not throw when invitation received', fakeAsync(() => {
      const callPromise = clientCallService.callServiceId('😍', '🤵');
      callPromise.then((call: CurrentClientCall) => {
        roomInvitationEvent.next({
          roomInvitation: {
            roomId: 'fake room',
          },
        });
        flushMicrotasks();
        expect(call.joinRoom).toHaveBeenCalledWith('fake room');
      });
      flushMicrotasks();
    }));
    it('should handle call answered by stop playing sound', fakeAsync(() => {
      const callPromise = clientCallService.callServiceId('😍', '🤵');
      callPromise.then(() => {
        answered.next();
        expect(fakeSoundService.callConnectingSound().stop).toHaveBeenCalledTimes(1);
      });
      flushMicrotasks();
    }));
    it('should handle call answered by stop playing sound', fakeAsync(() => {
      clientCallService.onCallOwnHangup().subscribe(callState => {
        expect(callState).toEqual('fake state');
      });
      const callPromise = clientCallService.callServiceId('😍', '🤵');
      callPromise.then(() => {
        clientCallService.handleMyOwnHangup(callObj);
        tick();
      });
      flushMicrotasks();
    }));
    it('should end call when destroyed from outside', fakeAsync(() => {
      clientCallService.onCallRemotelyHangup().subscribe(callState => {
        expect(callState).toEqual('fake state');
      });
      const callPromise = clientCallService.callServiceId('😍', '🤵');
      callPromise.then(() => {
        callDestroyed.next();
        tick();
      });
      flushMicrotasks();
    }));
  });
  describe('with communication service no connection', () => {
    it('should reject call', fakeAsync(() => {
      const callPromise = clientCallService.callServiceId('😍', '🤵');
      callPromise.catch(() => {
        expect(1).toBe(1);
      });
      flushMicrotasks();
    }));
  });
  describe('expect unexpected', () => {
    const error = {
      code: 123,
      message: 'fake message',
      name: 'fake name',
      error: {
        code: 123,
      },
    };
    beforeEach(() => {
      connectionEstablishedEvent.next({
        hello: {
          deviceId: 'fake device',
        },
        session: {
          machoke: {
            getPrestartedCall: jest.fn(() => Promise.reject(error)),
            getRoom: jest.fn(() => Promise.resolve('fake room')),
          },
        },
      });
    });
    it('should handle media failure', fakeAsync(() => {
      navigatorWrapper.getUserMediaStream = jest.fn(() => Promise.reject(error));
      const callPromise = clientCallService.callServiceId('😍', '🤵');
      callPromise.catch(err => {
        expect(err).toEqual(new Error('123'));
      });
      flushMicrotasks();
    }));
    it('should handle createRatelCall error', fakeAsync(() => {
      ratelService.postCreateCallRoute = jest.fn(() => throwError(error));
      const callPromise = clientCallService.callServiceId('😍', '🤵');
      callPromise.catch(err => {
        expect(err).toEqual(new Error('123'));
      });
      flushMicrotasks();
    }));
    it('should handle getPrestartedCall error', fakeAsync(() => {
      const callPromise = clientCallService.callServiceId('😍', '🤵');
      callPromise.catch(err => {
        expect(err).toEqual(new Error('123'));
      });
      flushMicrotasks();
    }));
    it('should handle createClientCall from factory error', fakeAsync(() => {
      connectionEstablishedEvent.next({
        hello: {
          deviceId: 'fake device',
        },
        session: {
          machoke: {
            getPrestartedCall: jest.fn(() => Promise.resolve()),
          },
        },
      });

      callFactory.createClientCall = jest.fn(() => {
        throw error;
      });
      const callPromise = clientCallService.callServiceId('😍', '🤵');
      callPromise.catch(err => {
        expect(err).toEqual(new Error('123'));
      });
      flushMicrotasks();
    }));
    it('should handle postStartCallRoute error', fakeAsync(() => {
      connectionEstablishedEvent.next({
        hello: {
          deviceId: 'fake device',
        },
        session: {
          machoke: {
            getPrestartedCall: jest.fn(() => Promise.resolve()),
          },
        },
      });

      ratelService.postStartCallRoute = jest.fn(() => throwError(error));
      const callPromise = clientCallService.callServiceId('😍', '🤵');
      callPromise.catch(err => {
        expect(err).toEqual(new Error('123'));
      });
      flushMicrotasks();
    }));
  });
});
