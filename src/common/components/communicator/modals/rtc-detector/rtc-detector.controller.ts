const DetectRTC = require('detectrtc');
export interface IRtcDetectorModalControllerScope extends ng.IScope {
}

export class RtcDetectorModalController implements ng.IController {
  public iconPosition: {
    left: string,
    top?: string,
    bottom?: string
  }
  public isEdge = false

  private static readonly defaultLeftPosition: string = '330px';
  private static readonly firefoxTopPosition: string = '240px';
  private static readonly chromeTopPosition: string = '145px';
  private static readonly operaTopPosition: string = '190px';
  private static readonly centerPosition: string = '50%';
  private static readonly EdgeLeftPosition: string = '0px';
  private static readonly EdgeBottomPosition: string = '120px';

  /* @ngInject */
  constructor() {
    this.iconPosition = {
      left: RtcDetectorModalController.defaultLeftPosition
    }
    if (DetectRTC.browser.isFirefox) {
      this.iconPosition.top = RtcDetectorModalController.firefoxTopPosition
    }
    if (DetectRTC.browser.isSafari) {
      this.iconPosition.left = RtcDetectorModalController.centerPosition
    }
    if (DetectRTC.browser.isEdge) {
      this.isEdge = true
      this.iconPosition = {
        left: RtcDetectorModalController.EdgeLeftPosition,
        bottom: RtcDetectorModalController.EdgeBottomPosition
      }
    }
    if (DetectRTC.browser.isOpera) {
      this.iconPosition = {
        top: RtcDetectorModalController.operaTopPosition,
        left: RtcDetectorModalController.centerPosition
      }
    }
    if (DetectRTC.browser.isChrome) {
      this.iconPosition.top = RtcDetectorModalController.chromeTopPosition
    }
  }
}
