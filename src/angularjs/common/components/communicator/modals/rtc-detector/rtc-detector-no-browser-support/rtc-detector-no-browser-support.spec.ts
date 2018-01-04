import * as angular from 'angular'
import rtcDetectorNoBrowserSupportModal from './rtc-detector-no-browser-support'
import {
  IRtcDetectorNoBrowserSupportModalControllerScope,
  RtcDetectorNoBrowserSupportModalController
} from './rtc-detector-no-browser-support.controller'

describe('Testing Controller: rtcDetectorNoBrowserSupportModal', () => {

  let modalController: RtcDetectorNoBrowserSupportModalController
  let scope: IRtcDetectorNoBrowserSupportModalControllerScope

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  beforeEach(() => {
    angular.mock.module(rtcDetectorNoBrowserSupportModal)
    inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) => {

      scope = <IRtcDetectorNoBrowserSupportModalControllerScope>$rootScope.$new()

      modalController = $controller<RtcDetectorNoBrowserSupportModalController>('rtcDetectorNoBrowserSupportModal', {
        $scope: scope,
        $uibModalInstance: $uibModalInstance,
        urlService: {
          resolveFileUrl: () => {}
        }
      })
    })
  })

  it('should exists', () => {
    return expect(modalController).toBeTruthy()
  })
})

