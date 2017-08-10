import {NavigatorWrapper} from '../../classes/navigator-wrapper'
const DetectRTC = require('detectrtc')
import {ModalsService} from '../modals/modals.service'

export class RtcDetectorService {
  private navigator: any
  private instanceModal: ng.ui.bootstrap.IModalInstanceService

  /* @ngInject */
  constructor(private modalsService: ModalsService,
              private $q: ng.IQService,
              private $timeout: ng.ITimeoutService) {

    this.navigator = window['navigator']
    this.navigator.getUserMedia =
      this.navigator.getUserMedia || this.navigator.mozGetUserMedia || this.navigator.webkitGetUserMedia
  }

  public isBrowserSupported = (): ng.IPromise<boolean> =>
    this.webRtcLoadWrapper(() =>
      DetectRTC.isWebRTCSupported
    )

  public isMediaPermissionGiven = (): ng.IPromise<boolean> =>
    this.webRtcLoadWrapper(() =>
      DetectRTC.isWebsiteHasWebcamPermissions && DetectRTC.isWebsiteHasMicrophonePermissions
    )

  public getAllMediaPermissions = (): ng.IPromise<void> =>
    this.$q<void>((resolve, reject) => {
      this.isMediaPermissionGiven().then(() => {
        resolve()
      }, () => {
        if (DetectRTC.browser.isIe || DetectRTC.browser.isEdge)
          this.modalsService.createBrowserDoesNotSupportRtcModal()
        else
          this.getUserMedia(resolve, reject)
      })
    })

  private getUserMedia = (resolve: () => void, reject: () => void): void => {
    const mediaDisplayObject = {
      shouldDisplayMedia: true
    };
    const timeOutDisplayPopupDelay = 100;

    this.$timeout(this.displayMediaPopup(mediaDisplayObject), timeOutDisplayPopupDelay)

    navigator.getUserMedia(NavigatorWrapper.getAllConstraints(), () => {
      this.instanceModal.close('cancel')
      resolve();
    }, () => {
      this.modalsService.createRtcDetectorBlockedModal()
      mediaDisplayObject.shouldDisplayMedia = false;
      this.instanceModal.close('cancel')

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
