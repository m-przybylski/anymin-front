const DetectRTC = require('detectrtc');
export interface IRtcDetectorModalControllerScope extends ng.IScope {
}

export class RtcDetectorModalController implements ng.IController {
  public isEdge = false
  public isOpera = false
  public isFirefox = false
  public isSafari = false

  /* @ngInject */
  constructor() {
    if (DetectRTC.browser.isFirefox) {
      this.isFirefox = true
    }
    if (DetectRTC.browser.isSafari) {
      this.isSafari = true
    }
    if (DetectRTC.browser.isEdge) {
      this.isEdge = true
    }
    if (DetectRTC.browser.isOpera) {
      this.isOpera = true
    }
  }
}
