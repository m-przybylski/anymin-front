import { RatelCallDetails } from 'profitelo-api-ng/model/models';
import { CurrentCall } from '../models/current-call';
import { ClientCallService } from '../call-services/client-call.service';
import { ExpertCallService } from '../call-services/expert-call.service';
import { Config } from '../../../../../config';
import { TranslatorService } from '../../../services/translator/translator.service';
import { NavigatorWrapper } from '../../../classes/navigator-wrapper/navigator-wrapper';
import { LoggerService } from '@anymind-ng/core';

export interface INavigationComponentBindings {
  isMessenger: boolean;
  currentCall: CurrentCall;
  isVideo: boolean;
}

interface INavigationComponentController extends INavigationComponentBindings {
  areOptions: boolean;
  isAudio: boolean;
}

// tslint:disable:member-ordering
export class NavigationComponentController implements ng.IController, INavigationComponentController {

  public areOptions = false;
  public isAudio = true;
  public isVideo: boolean;
  public isToogleCameraVisible: boolean;
  public isMessenger: boolean;
  public currentCall: CurrentCall;
  public isPlatformForExpert = Config.isPlatformForExpert;

  public static $inject = ['translatorService', 'clientCallService', 'expertCallService', 'logger'];

  private changeCameraErrorMessage = this.translatorService.translate('COMMUNICATOR.ERROR.SWITCH_CAMERA');

  constructor(private translatorService: TranslatorService,
              clientCallService: ClientCallService,
              expertCallService: ExpertCallService,
              logger: LoggerService) {
    clientCallService.onNewCall(this.clearButtonsState);
    expertCallService.onNewCall(this.clearButtonsState);
    expertCallService.onCallPull(this.clearButtonsState);
    new NavigatorWrapper().hasMoreThanOneCamera().then(
      (val) => this.isToogleCameraVisible = val,
      (err) => logger.warn('NavigationComponentController: Can not get information about media devices', err));
  }

  public hangupCall = (): ng.IPromise<RatelCallDetails> =>
    this.currentCall.hangup()

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
    // FIXME
    // tslint:disable-next-line:no-floating-promises
    this.currentCall.stopVideo().then(() => {
      this.currentCall.changeCamera().then(() => {
        this.isVideo = true;
      }, (_err) => {
        alert(this.changeCameraErrorMessage);
      });
    });
  }

  public startAudio = (): void => {
    this.isAudio = true;
    this.currentCall.startAudio().then().catch(() => {
      this.isAudio = false;
    });
  }

  public stopAudio = (): void => {
    this.isAudio = false;
    this.currentCall.stopAudio();
  }

  public stopVideo = (): void => {
    this.isVideo = false;
    // FIXME
    // tslint:disable-next-line:no-floating-promises
    this.currentCall.stopVideo();
  }

  public startVideo = (elem: Element): void => {
    this.isVideo = true;
    this.currentCall.startVideo().catch(() => {
      this.isVideo = false;
    });
    this.animateButtons(elem);
  }

  public toggleOptions = (elem: Element): void => {
    this.animateButtons(elem);
    this.areOptions = !this.areOptions;
  }

  public toggleMessenger = (elem: Element): void => {
    this.animateButtons(elem);
    this.isMessenger = !this.isMessenger;
  }

  private clearButtonsState = (): void => {
    this.isAudio = true;
    this.isVideo = false;
    this.isMessenger = false;
  }
}
