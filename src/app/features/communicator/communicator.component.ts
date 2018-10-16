import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GetProfile, GetService } from '@anymind-ng/api';
import {
  AvatarSize,
  CommunicatorService,
  CurrentExpertCall,
  LoggerFactory,
  MicrophoneService,
  MicrophoneStateEnum,
  NavigationComponent,
  NavigationService,
  NavigationServiceState,
} from '@anymind-ng/core';
import { ReplaySubject, Subject, race } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ExpertCallService, IExpertSessionCall } from '../../core/services/call/expert-call.service';
import { CallReason } from 'ratel-sdk-js';
import { Logger } from '@platform/core/logger';

@Component({
  selector: 'plat-communicator',
  templateUrl: './communicator.component.html',
  styleUrls: ['./communicator.component.sass'],
})
export class CommunicatorComponent extends Logger implements OnInit, OnDestroy {
  public isClosed = true;
  public isDisconnectedAnimation = false;
  public isConnecting = true;
  public service?: GetService;
  public expert?: GetProfile;
  public expertAvatar?: string;

  public isRemoteVideo = false;
  public isLocalVideo = false;
  public isMessenger = false;

  public serviceName: string;
  public expertName: string;

  @Input()
  public minimizeCommunicator: () => void;

  @ViewChild('localVideoStreamElement')
  public localVideoStreamElement: ElementRef;

  @ViewChild('remoteVideoStreamElement')
  public remoteVideoStreamElement: ElementRef;

  @ViewChild('remoteAudioStreamElement')
  public remoteAudioStreamElement: ElementRef;

  @ViewChild('navigation')
  public navigationComponent: NavigationComponent;

  public isMobile = false;
  public isReconnecting = false;
  public isExpertOffline = false;
  public AvatarSizeEnum: typeof AvatarSize = AvatarSize;
  public newCallEvent = new ReplaySubject<CurrentExpertCall>(1);
  public currentMicrophoneStateEnum: MicrophoneStateEnum = MicrophoneStateEnum.GOOD;
  public microphoneStateEnums: typeof MicrophoneStateEnum = MicrophoneStateEnum;
  public isUserInactive = false;

  private ngUnsubscribe$ = new Subject<void>();
  private currentCall: CurrentExpertCall;

  constructor(
    private navigationService: NavigationService,
    private microphoneService: MicrophoneService,
    private location: Location,
    private callService: ExpertCallService,
    loggerFactory: LoggerFactory,
    communicatorService: CommunicatorService,
  ) {
    super(loggerFactory);
    communicatorService.connectionEstablishedEvent$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => (this.isReconnecting = false));
    communicatorService.connectionLostEvent$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => (this.isReconnecting = true));
  }

  public ngOnInit(): void {
    this.navigationService.getCurrentNavigationStateEmitter().subscribe(this.onUserInactivity);
    this.microphoneService.onMicrophoneStatusChange(state => (this.currentMicrophoneStateEnum = state));
    this.AvatarSizeEnum = AvatarSize;
    this.callService.newCall$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(call => {
      this.registerExpertCall(call);
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.localVideoStreamElement.nativeElement.srcObject = undefined;
  }

  public canDeactivate(): boolean {
    return this.isDisconnectedAnimation;
  }

  public changeCamera = (): void => {
    this.navigationComponent.changeCamera();
  };

  public hangupCall = (): void => {
    this.loggerService.debug('Hanging up the call');
    if (this.currentCall) {
      this.currentCall.hangup(CallReason.Hangup).then(
        () => this.loggerService.debug('Call hanged up'),
        err => {
          this.loggerService.warn('Could not hangup the call', err);
        },
      );
    } else {
      this.loggerService.error('Cannot hangup the call, there is no call');
    }
  };

  private onUserInactivity = (navigationServiceState: NavigationServiceState): void => {
    if (navigationServiceState === NavigationServiceState.INACTIVE) {
      this.isUserInactive = true;
    } else if (navigationServiceState === NavigationServiceState.ACTIVE) {
      this.isUserInactive = false;
    }
  };

  private registerExpertCall = (expertSessionCall: IExpertSessionCall): void => {
    this.newCallEvent.next(expertSessionCall.currentExpertCall);
    this.registerCommonCallEvents(expertSessionCall.currentExpertCall);
    this.serviceName = expertSessionCall.currentExpertCall.getServiceName();
    this.isConnecting = false;
    this.isClosed = false;
  };

  private registerCommonCallEvents = (call: CurrentExpertCall): void => {
    this.currentCall = call;
    call.localMediaTrack$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(this.onLocalMediaTrack);
    call.remoteMediaTrack$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(this.onRemoteMediaTrack);
    call.remoteVideoStatus$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(this.onRemoteVideoStream);
    race(call.callDestroyed$, this.callService.hangupCall$)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        first(),
      )
      .subscribe(this.onCallEnd);
  };

  private onRemoteVideoStream = (videoStatus: boolean): void => {
    this.isRemoteVideo = videoStatus;
  };

  private onRemoteMediaTrack = (track: MediaStreamTrack): void => {
    this.loggerService.debug(`Remote track received ${track.id}`, track);
    if (this.remoteAudioStreamElement && this.remoteVideoStreamElement) {
      if (track.kind === 'video') {
        this.attachTrackToElement(this.remoteVideoStreamElement, track);
        this.remoteVideoStreamElement.nativeElement.play();
        track.onended = (): void => {
          this.isRemoteVideo = false;
          this.loggerService.debug(`Remote track ${track.id} END`);
        };
      } else {
        this.attachTrackToElement(this.remoteAudioStreamElement, track);
        this.remoteAudioStreamElement.nativeElement.play();
      }
    } else {
      this.loggerService.error('remote Stream Elements are undefined');
    }
  };

  private onLocalMediaTrack = (track: MediaStreamTrack): void => {
    if (this.localVideoStreamElement) {
      this.loggerService.info('CommunicatorMaximizedComponent: setting local stream');
      if (track.kind === 'video') {
        this.attachTrackToElement(this.localVideoStreamElement, track);
        this.localVideoStreamElement.nativeElement.muted = true;
        this.localVideoStreamElement.nativeElement.volume = 0;
        this.localVideoStreamElement.nativeElement.play();
      }
    } else {
      this.loggerService.error('local stream elements are undefined');
    }
  };

  private onCallEnd = (): void => {
    this.isDisconnectedAnimation = true;
    // TODO After we remove AngularJS we should change this for angular router method.
    this.location.back();
  };

  private attachTrackToElement = (element: ElementRef, track: MediaStreamTrack): void => {
    const stream = new MediaStream([track]);
    try {
      element.nativeElement.srcObject = stream;
    } catch (_err) {
      element.nativeElement.src = URL.createObjectURL(stream);
    }
  };
}
