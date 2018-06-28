// tslint:disable:strict-boolean-expressions
// tslint:disable:no-any
import { CurrentCall } from '../models/current-call';
import { ExpertCallService } from '../call-services/expert-call.service';
import { Config } from '../../../../../config';
import { ModalsService } from '../../../services/modals/modals.service';
import { LoggerService } from '@anymind-ng/core';
import { NavigatorWrapper } from '../../../classes/navigator-wrapper/navigator-wrapper';
import { ExpertCall } from '../models/current-expert-call';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface INavigationComponentBindings {
  isMessenger: boolean;
  isVideo: boolean;
}

interface INavigationComponentController extends INavigationComponentBindings {
  areOptions: boolean;
  isAudio: boolean;
}

export class NavigationComponentController implements ng.IController, ng.IOnInit, ng.IOnDestroy,
  INavigationComponentController {

  public static $inject = ['modalsService', 'logger', 'expertCallService'];
  public areOptions = false;
  public isAudio = true;
  public isVideo: boolean;
  public isToogleCameraVisible: boolean;
  public isMessenger: boolean;
  public currentCall?: CurrentCall;
  public isPlatformForExpert = Config.isPlatformForExpert;

  private ngUnsubscribe = new Subject<void>();

  constructor(private modalsService: ModalsService,
              private logger: LoggerService,
              private expertCallService: ExpertCallService) {
    new NavigatorWrapper().hasMoreThanOneCamera().then(
      (val) => this.isToogleCameraVisible = val,
      (err) => logger.warn('NavigationComponentController: Can not get information about media devices', err));
  }

  public $onInit(): void {
    this.expertCallService.newCall$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.handleNewCall);
  }

  public $onDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public hangupCall = (): void => {
    this.logger.debug('NavigationComponentController: Hanging up the call');
    if (this.currentCall) {
      this.currentCall.hangup().then(
        () => this.logger.debug('NavigationComponentController: Call hanged up'),
        (err) => this.logger.error('NavigationComponentController: Could not hangup the call', err))
        .catch(() => {
          if (this.currentCall) {
            this.currentCall.forceEndCall();
          }
        });
    } else {
      this.logger.error('NavigationComponentController: Cannot hangup the call, there is no call');
    }
  }

  public animateButtons = (elem: any): void => {
    if (elem.currentTarget.classList.contains('is-active')) {
      elem.currentTarget.classList.add('is-inactive');
      elem.currentTarget.classList.remove('is-active');
    } else {
      elem.currentTarget.classList.remove('is-inactive');
      elem.currentTarget.classList.add('is-active');
    }
  }

  public changeCamera = (): void => {
    this.logger.debug('NavigationComponentController: Trying to change camera');
    if (this.currentCall) {
      if (this.isVideo) {
        this.isVideo = false;
        this.currentCall.stopVideo();
          this.logger.debug('NavigationComponentController: Video stopped successfully - calling turnOnSecondCamera');
          this.turnOnSecondCamera();
      } else {
        this.logger.debug('NavigationComponentController: Video is stopped - calling turnOnSecondCamera');
        this.turnOnSecondCamera();
      }
    } else {
      this.logger.error('NavigationComponentController: Cannot stop the camera, there is no call');
    }
  }

  public startAudio = (): void => {
    if (this.currentCall) {
      this.logger.debug('NavigationComponentController: Starting the audio');
      if (!this.isAudio) {
        this.isAudio = true;
        this.currentCall.unmute();
      } else {
        this.logger.error('NavigationComponentController: Cannot start audio - audio is already started');
      }
    } else {
      this.logger.error('NavigationComponentController: Cannot start the audio, there is no call');
    }
  }

  public stopAudio = (): void => {
    this.logger.debug('NavigationComponentController: Stopping the audio');
    if (this.currentCall) {
      if (this.isAudio) {
        this.isAudio = false;
        this.currentCall.mute();
        this.logger.debug('NavigationComponentController: Audio stopped successfully');
      } else {
        this.logger.error('NavigationComponentController: Cannot stop audio - audio is already stopped');
      }
    } else {
      this.logger.error('NavigationComponentController: Cannot stop the audio, there is no call');
    }
  }

  public stopVideo = (): void => {
    this.logger.debug('NavigationComponentController: Stopping video');
    if (this.currentCall) {
      if (this.isVideo) {
        this.isVideo = false;
        this.currentCall.stopVideo();
      } else {
        this.logger.error('NavigationComponentController: Cannot stop the video - video is already stopped');
      }
    } else {
      this.logger.error('NavigationComponentController: Cannot stop the video, there is no call');
    }
  }

  public startVideo = (elem: Element): void => {
    this.logger.debug('NavigationComponentController: Starting video');
    if (this.currentCall) {
      if (!this.isVideo) {
        this.isVideo = true;
        this.animateButtons(elem);
        this.currentCall.startVideo().then(() => {
          this.logger.debug('NavigationComponentController: Video started');
        }, (err) => {
          this.isVideo = false;
          this.logger.error('NavigationComponentController: Cannot start the video', err);
        });
      } else {
        this.logger.error('NavigationComponentController: Cannot start the video - video is already started');
      }
    } else {
      this.logger.error('NavigationComponentController: Cannot start the video, there is no call');
    }
  }

  public toggleOptions = (elem: Element): void => {
    this.animateButtons(elem);
    this.areOptions = !this.areOptions;
  }

  public toggleMessenger = (elem: Element): void => {
    this.animateButtons(elem);
    this.isMessenger = !this.isMessenger;
  }

  private handleNewCall = (expertCall: ExpertCall): void => {
    this.currentCall = expertCall;
    this.isAudio = true;
    this.isVideo = false;
    this.isMessenger = false;
  }

  private turnOnSecondCamera = (): void => {
    if (this.currentCall) {
      if (!this.isVideo) {
        this.isVideo = true;
        this.currentCall.changeCamera().then(() => {
          this.logger.debug('NavigationComponentController: Successfully turned second camera');
        }).catch((err) => {
          this.isVideo = false;
          this.modalsService.createInfoAlertModal('COMMUNICATOR.ERROR.SWITCH_CAMERA');
          this.logger.error('NavigationComponentController: Cannot turn on the second camera', err);
        });
      } else {
        this.logger.error('NavigationComponentController: Cannot turn on second camera,' +
          'there is a video already, stop it firstly');
      }
    } else {
      this.logger.error('NavigationComponentController: Cannot change the camera, there is no call');
    }
  }
}
