import { CurrentCall } from '../models/current-call';
import { ExpertCallService } from '../call-services/expert-call.service';
import { Config } from '../../../../../config';
import { ModalsService } from '../../../services/modals/modals.service';
import { LoggerService } from '@anymind-ng/core';
import { NavigatorWrapper } from '../../../classes/navigator-wrapper/navigator-wrapper';
import { ExpertCall } from '../models/current-expert-call';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

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
        (err) => this.logger.error('NavigationComponentController: Could not hangup the call', err));
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
    this.logger.error('NavigationComponentController: Trying to change camera');
    if (this.currentCall) {
      this.currentCall.stopVideo().then(() => {
        this.isVideo = false;
        if (this.currentCall) {
          this.currentCall.changeCamera().then(() => {
            this.isVideo = true;
          }, (err) => {
            this.modalsService.createInfoAlertModal('COMMUNICATOR.ERROR.SWITCH_CAMERA');
            this.logger.error('NavigationComponentController: Cannot change the camera', err);
          });
        } else {
          this.logger.error('NavigationComponentController: Cannot change the camera, there is no call');
        }
      }, (err) => this.logger.error('NavigationComponentController: Could not stop the video', err));
    } else {
      this.logger.error('NavigationComponentController: Cannot stop the camera, there is no call');
    }
  }

  public startAudio = (): void => {
    if (this.currentCall) {
      this.logger.debug('NavigationComponentController: Starting the audio');
      this.isAudio = true;
      this.currentCall.startAudio().then(
        () => this.logger.debug('NavigationComponentController: Audio started'),
        (err) => {
          this.isAudio = false;
          this.logger.debug('NavigationComponentController: Starting the audio failed', err);
        });
    } else {
      this.logger.error('NavigationComponentController: Cannot start the audio, there is no call');
    }
  }

  public stopAudio = (): void => {
    this.logger.debug('NavigationComponentController: Stopping the audio');
    if (this.currentCall) {
      this.isAudio = false;
      this.currentCall.stopAudio();
    } else {
      this.logger.error('NavigationComponentController: Cannot stop the audio, there is no call');
    }
  }

  public stopVideo = (): void => {
    if (this.isVideo) {
      this.isVideo = false;
      if (this.currentCall) {
        this.currentCall.stopVideo().then(
          () => this.logger.debug('NavigationComponentController: Video stopped'),
          (err) => {
            this.isVideo = true;
            this.logger.warn('NavigationComponentController: Cannot stop the video', err);
          });
      } else {
        this.logger.error('NavigationComponentController: Cannot stop the video, there is no call');
      }
    }
  }

  public startVideo = (elem: Element): void => {
    this.logger.debug('NavigationComponentController: Starting video');
    if (this.currentCall) {
      this.isVideo = true;
      this.animateButtons(elem);
      this.currentCall.startVideo().then(() => {
        this.logger.debug('NavigationComponentController: Video started');
      }, (err) => {
        this.isVideo = false;
        this.logger.error('NavigationComponentController: Cannot start the video', err);
      });
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
}
