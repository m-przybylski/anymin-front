import {NavigatorService} from '../navigator/navigator.service'
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

  public isUserAbleToCall = (): ng.IPromise<boolean> => {
    return this.$q((resolve, reject) => {
      this.isMediaPermissionGiven().then(() => {
        resolve()
      }, () => {
        this.getUserMedia(resolve, reject)
      })
    })
  }

  private getUserMedia = (resolve: () => void, reject: () => void) => {
    const mediaDisplayObject = {
      shouldDisplayMedia: true
    };

    window.setTimeout(this.displayMediaPopup(mediaDisplayObject), 100)

    navigator.getUserMedia(NavigatorService.getAllConstraints(), () => {
      console.log(DetectRTC.browser, DetectRTC.browser.isChrome)
      this.instanceModal.close('cancel')
      resolve();
    }, () => {
      this.instanceModal.close('cancel')
      this.modalsService.createRtcDetectorBlockedModal()
      mediaDisplayObject.shouldDisplayMedia = false;
      reject();
    });
  }

  private displayMediaPopup = (mediaDisplayObject: {shouldDisplayMedia: boolean}): () => void =>
    () => {mediaDisplayObject.shouldDisplayMedia && (this.instanceModal = this.modalsService.createRtcDetectorModal(DetectRTC.browser))}


  // gives us certainty that webrtc tools are loaded
  private webRtcLoadWrapper(fn: () => boolean): ng.IPromise<boolean> {
    return this.$q((resolve, reject) => {
      DetectRTC.load(() => {
        fn() ? resolve() : reject()
      })
    })
  }

}
