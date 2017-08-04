import {NavigatorWrapper} from '../../classes/navigator-wrapper'
const DetectRTC = require('detectrtc')
import {ModalsService} from '../modals/modals.service'

export class RtcDetectorService {
  private navigator: any
  private instanceModal: ng.ui.bootstrap.IModalInstanceService

  /* @ngInject */
  constructor(private modalsService: ModalsService,
              private $q: ng.IQService) {

    this.navigator = window['navigator']
    this.navigator.getUserMedia =
      this.navigator.getUserMedia || this.navigator.mozGetUserMedia || this.navigator.webkitGetUserMedia
  }

  public isBrowserSupported(): ng.IPromise<boolean> {
    return this.webRtcLoadWrapper(() => {
      return DetectRTC.isWebRTCSupported
    })
  }

  public isMediaPermissionGiven(): ng.IPromise<boolean> {
    return this.webRtcLoadWrapper(() => {
      return DetectRTC.isWebsiteHasWebcamPermissions && DetectRTC.isWebsiteHasMicrophonePermissions
    })
  }

  public isUserAbleToCall = (): ng.IPromise<void> => {
    return this.$q<void>((resolve, reject) => {
      this.isMediaPermissionGiven().then(() => {
        resolve()
      }, () => {
        if (DetectRTC.browser.isIe || DetectRTC.browser.isEdge)
          this.modalsService.createBrowserDoesNotSupportRtcModal()
        else
          this.getUserMedia(resolve, reject)
      })
    })
  }

  private getUserMedia = (resolve: () => void, reject: () => void) => {
    const mediaDisplayObject = {
      shouldDisplayMedia: true
    };

    window.setTimeout(this.displayMediaPopup(mediaDisplayObject), 100)

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
    () => {mediaDisplayObject.shouldDisplayMedia && (this.instanceModal = this.modalsService.createRtcDetectorModal())}


  // gives us certainty that webrtc tools are loaded
  private webRtcLoadWrapper(fn: () => boolean): ng.IPromise<boolean> {
    return this.$q((resolve, reject) => {
      DetectRTC.load(() => {
        fn() ? resolve() : reject()
      })
    })
  }

}
