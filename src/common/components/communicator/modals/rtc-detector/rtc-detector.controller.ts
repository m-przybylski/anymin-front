export interface IRtcDetectorModalControllerScope extends ng.IScope {
}
export class RtcDetectorModalController implements ng.IController {
  public isSupportedRTC = false

  /* @ngInject */
  constructor($scope: ng.IScope) {
    const browserDetector = $scope.browserDetector
    this.isSupportedRTC = browserDetector.isIE || browserDetector.isEdge
  }
}
