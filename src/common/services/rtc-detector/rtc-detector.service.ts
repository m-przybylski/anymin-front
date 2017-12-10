import {NavigatorWrapper} from '../../classes/navigator-wrapper'
const DetectRTC = require('detectrtc')
import {ModalsService} from '../modals/modals.service'
import {MediaStreamConstraintsWrapper} from '../../classes/media-stream-constraints-wrapper'

export class RtcDetectorService {
  private instanceModal: ng.ui.bootstrap.IModalInstanceService
  private navigatorWrapper: NavigatorWrapper = new NavigatorWrapper()

  /* @ngInject */
  constructor(private modalsService: ModalsService,
              private $q: ng.IQService,
              private $timeout: ng.ITimeoutService) {
  }

  public isBrowserSupported = (): ng.IPromise<boolean> =>
    this.webRtcLoadWrapper(() =>
      DetectRTC.isWebRTCSupported
    )

  private isMediaPermissionGiven = (mediaStreamConstraints: MediaStreamConstraints): ng.IPromise<boolean> =>
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
        }, () => {
          reject()
        })
      }, () => {
        if (DetectRTC.browser.isIe)
          this.modalsService.createBrowserDoesNotSupportRtcModal()
        else
          this.getUserMedia(resolve, reject)
      })
    })

  private getUserMedia = (resolve: (stream: MediaStream) => void, reject: () => void): void => {
    const mediaDisplayObject = {
      shouldDisplayMedia: true
    };
    const timeOutDisplayPopupDelay = 100;

    this.$timeout(this.displayMediaPopup(mediaDisplayObject), timeOutDisplayPopupDelay)

    this.navigatorWrapper.getUserMediaStream(MediaStreamConstraintsWrapper.getDefault()).then((stream) => {
      this.instanceModal.close('cancel')
      resolve(stream);
    }, () => {
      this.modalsService.createRtcDetectorBlockedModal()
      mediaDisplayObject.shouldDisplayMedia = false;
      if (this.instanceModal) this.instanceModal.close('cancel')
      reject();
    });
  }

  private displayMediaPopup = (mediaDisplayObject: {shouldDisplayMedia: boolean}): () => void =>
    (): void => {mediaDisplayObject.shouldDisplayMedia &&
      (this.instanceModal = this.modalsService.createRtcDetectorModal())}

  // gives us certainty that webrtc tools are loaded
  private webRtcLoadWrapper = (fn: () => boolean): ng.IPromise<boolean> =>
    this.$q((resolve, reject) =>
      DetectRTC.load(() => {
        fn() ? resolve() : reject()
      })
    )
}
