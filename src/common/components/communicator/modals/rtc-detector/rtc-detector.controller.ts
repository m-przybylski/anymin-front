export interface IRtcDetectorModalControllerScope extends ng.IScope {
}
export class RtcDetectorModalController implements ng.IController {
  private _iconPosition: {
    left: string,
    top?: string
  }

  private static readonly defaultLeftPosition: string = '330px';
  private static readonly firefoxTopPosition: string = '240px';
  private static readonly chromeTopPosition: string = '145px';
  private static readonly operaTopPosition: string = '190px';
  private static readonly operaLeftPosition: string = '50%';


  /* @ngInject */
  constructor() {
    this._iconPosition = {
      left: RtcDetectorModalController.operaLeftPosition,
      top: RtcDetectorModalController.operaTopPosition
    }
  }

}
