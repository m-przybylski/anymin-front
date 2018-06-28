// tslint:disable:no-any
// tslint:disable:curly
import { LoggerService } from '@anymind-ng/core';
import { NavigatorWrapper } from '../../classes/navigator-wrapper/navigator-wrapper';
const DetectRTC = require('detectrtc');
import { ModalsService } from '../modals/modals.service';

// tslint:disable:member-ordering
export class RtcDetectorService {
  public static $inject = ['modalsService', '$q', '$timeout', 'logger'];
  private instanceModal: ng.ui.bootstrap.IModalInstanceService;
  private navigatorWrapper: NavigatorWrapper = new NavigatorWrapper();

  constructor(private modalsService: ModalsService,
              private $q: ng.IQService,
              private $timeout: ng.ITimeoutService,
              private logger: LoggerService) {
  }

  public isBrowserSupported = (): ng.IPromise<boolean> =>
    this.webRtcLoadWrapper(() =>
      DetectRTC.isWebRTCSupported
    )

  private isMediaPermissionGiven = (mediaStreamConstraints: MediaStreamConstraints): ng.IPromise<boolean> =>
    // tslint:disable-next-line:cyclomatic-complexity
    this.webRtcLoadWrapper(() =>
      mediaStreamConstraints.audio && !mediaStreamConstraints.video ? DetectRTC.isWebsiteHasMicrophonePermissions :
      !mediaStreamConstraints.audio && mediaStreamConstraints.video ? DetectRTC.isWebsiteHasWebcamPermissions :
      mediaStreamConstraints.audio && mediaStreamConstraints.video  ? DetectRTC.isWebsiteHasWebcamPermissions
      && DetectRTC.isWebsiteHasMicrophonePermissions : false
    )

  public getMedia = (mediaStreamConstraints: MediaStreamConstraints): ng.IPromise<MediaStream> =>
    this.$q<MediaStream>((resolve, reject) => {
      this.isMediaPermissionGiven(mediaStreamConstraints).then(() => {
        this.navigatorWrapper.getUserMediaStream(mediaStreamConstraints).then((stream) => {
          resolve(stream);
        }, (err) => {
          reject(err);
        });
      }, (err) => {
        this.logger.warn('RtcDetectorService: isMediaPermissionGiven rejected with error', err);
        if (DetectRTC.browser.isIe)
          this.modalsService.createBrowserDoesNotSupportRtcModal();
        else
          this.getUserMedia(resolve, reject);
      });
    })

  private getUserMedia = (resolve: (stream: MediaStream) => void, reject: (err: any) => void): void => {
    const mediaDisplayObject = {
      shouldDisplayMedia: true
    };
    const timeOutDisplayPopupDelay = 100;

    this.$timeout(this.displayMediaPopup(mediaDisplayObject), timeOutDisplayPopupDelay);

    this.navigatorWrapper.getUserMediaStream(NavigatorWrapper.audioConstraints).then((stream) => {
      this.instanceModal.close('cancel');
      resolve(stream);
    }, (err) => {
      this.logger.warn('RtcDetectorService: Can not get user media', err);
      this.logger.debug('RtcDetectorService: Showing media blocked modal');
      this.modalsService.createRtcDetectorBlockedModal();
      mediaDisplayObject.shouldDisplayMedia = false;
      if (this.instanceModal) this.instanceModal.close('cancel');
      reject(err);
    });
  }

  private displayMediaPopup = (mediaDisplayObject: {shouldDisplayMedia: boolean}): () => void =>
    (): void => {
    if (mediaDisplayObject.shouldDisplayMedia) {
      this.instanceModal = this.modalsService.createRtcDetectorModal();
    }
  }

  // gives us certainty that webrtc tools are loaded
  private webRtcLoadWrapper = (fn: () => boolean): ng.IPromise<boolean> =>
    this.$q((resolve, reject) =>
      DetectRTC.load(() => {
        fn() ? resolve() : reject();
      })
    )
}
