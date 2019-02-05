import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NavigationService, NavigationServiceState } from './navigation.service';
import { MessengerService } from '../messenger/messeger.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from '../../../services/alert/alert.service';
import { CurrentClientCall } from '../../../services/call/current-client-call';
import { MicrophoneService, MicrophoneStateEnum } from '../../../services/microphone.service';
import { LoggerService } from '../../../services/logger.service';
import { CurrentExpertCall } from '../../../services/call/current-expert-call';

@Component({
  selector: 'am-core-communicator-nav',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.sass'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  public areOptions = false;
  public isAudio = true;

  @Input()
  public isVideo: boolean;

  @Output()
  public isVideoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  public isMessenger: boolean;

  @Output()
  public isMessengerChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  public minimizeCommunicator: () => void;

  @Input()
  public isMobile: boolean;

  @Input()
  public newCallEvent: Subject<CurrentClientCall | CurrentExpertCall>;

  @Input()
  public hangupCall: () => void;

  public isUserInactive = false;

  public isConnected = false;

  public currentMicrophoneStateEnum: MicrophoneStateEnum = MicrophoneStateEnum.GOOD;

  public microphoneStateEnums: typeof MicrophoneStateEnum = MicrophoneStateEnum;

  public currentCall: CurrentClientCall | CurrentExpertCall;

  public unseenMessages = 0;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private navigationService: NavigationService,
    private alertService: AlertService,
    private logger: LoggerService,
    private microphoneService: MicrophoneService,
    private messengerService: MessengerService,
  ) {}

  public ngOnInit(): void {
    this.newCallEvent.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(this.registerCall);

    this.microphoneService.onMicrophoneStatusChange(state => (this.currentMicrophoneStateEnum = state));
    if (!this.isMobile) {
      this.navigationService.userActivity$.subscribe(this.onUserInactivity);
    }
    this.messengerService
      .getUnseenMessagesSubject()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(val => {
        this.unseenMessages = val;
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.messengerService.resetMessages();
  }

  public changeCamera = (): void => {
    this.logger.debug('NavigationComponent: changing camera');
    if (this.isVideo) {
      this.isVideo = false;
      this.isVideoChange.emit(false);
      this.currentCall.stopVideo();
      this.turnOnSecondCamera();
    } else {
      this.logger.debug('NavigationComponent: there is no video, calling turnOnSecondCamera');
      this.turnOnSecondCamera();
    }
  };

  public toggleAudio = (): void => {
    this.isAudio ? this.stopAudio() : this.startAudio();
  };

  public toggleVideo = (): void => {
    this.isVideo ? this.stopVideo() : this.startVideo();
  };

  public stopVideo = (): void => {
    if (this.isVideo) {
      this.logger.debug('NavigationComponent: Stopping video');
      this.isVideo = false;
      this.isVideoChange.emit(false);
      this.currentCall.stopVideo();
    } else {
      this.logger.error('NavigationComponent: Can not stop the video - video is already stopped');
    }
  };

  public startVideo = (): void => {
    if (!this.isVideo) {
      this.logger.debug('NavigationComponent: Starting video');
      this.isVideo = true;
      this.isVideoChange.emit(true);
      this.currentCall.startVideo();
    } else {
      this.logger.error('NavigationComponent: Can not start the video - video is already started');
    }
  };

  public toggleOptions = (_elem: Element): void => {
    this.areOptions = !this.areOptions;
  };

  public toggleMessenger = (_elem: Element): void => {
    if (this.isConnected) {
      this.isMessenger = !this.isMessenger;
      this.isMessengerChange.emit(this.isMessenger);
    }
  };

  private onUserInactivity = (navigationServiceState: NavigationServiceState): void => {
    if (navigationServiceState === NavigationServiceState.INACTIVE) {
      this.isUserInactive = true;
    } else if (navigationServiceState === NavigationServiceState.ACTIVE) {
      this.isUserInactive = false;
    }
  };

  private registerCall = (call: CurrentClientCall | CurrentExpertCall): void => {
    this.currentCall = call;
    this.isClientCall(call)
      ? call.answered$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => (this.isConnected = true))
      : (this.isConnected = true);
    call.callDestroyed$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(this.messengerService.resetMessages);
  };

  private isClientCall(call: CurrentClientCall | CurrentExpertCall): call is CurrentClientCall {
    return call.hasOwnProperty('answered$');
  }

  private turnOnSecondCamera = (): void => {
    if (!this.isVideo) {
      this.logger.debug('NavigationComponent: Video is off, turning on the second camera');
      this.isVideo = true;
      this.isVideoChange.emit(true);
      this.currentCall
        .changeCamera()
        .then(() => {
          this.logger.debug('NavigationComponent: Second camera turned on successfully');
        })
        .catch(err => {
          this.logger.error('NavigationComponent: Cannot turn on second camera', err);
          this.isVideo = false;
          this.isVideoChange.emit(false);
          this.alertService.pushWarningAlert('ALERT.NO_CAMERA_ACCESS');
        });
    } else {
      this.logger.error('NavigationComponent: Can not turn on second camera - video is already started');
    }
  };

  private startAudio = (): void => {
    if (!this.isAudio) {
      this.logger.debug('NavigationComponent: Starting audio');
      this.isAudio = true;
      this.currentCall.unmute();
    } else {
      this.logger.error('NavigationComponent: Can not start the audio - audio is already started');
    }
  };

  private stopAudio = (): void => {
    if (this.isAudio) {
      this.isAudio = false;
      this.currentCall.mute();
      this.logger.debug('NavigationComponent: Audio stopped successfully');
    } else {
      this.logger.error('NavigationComponent: Can not stop the audio - audio is already stopped');
    }
  };
}
