import * as angular from 'angular'
import rtcDetectorBlockedModal from './rtc-detector-blocked'
import {
  IRtcDetectorBlockedModalControllerScope,
  RtcDetectorBlockedModalController
} from './rtc-detector-blocked.controller'

describe('Testing Controller: rtcDetectorBlockedModal', () => {

  let modalController: RtcDetectorBlockedModalController
  let scope: IRtcDetectorBlockedModalControllerScope

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  beforeEach(() => {
    angular.mock.module(rtcDetectorBlockedModal)
    inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) => {

      scope = <IRtcDetectorBlockedModalControllerScope>$rootScope.$new()

      modalController = $controller<RtcDetectorBlockedModalController>('rtcDetectorBlockedModal', {
        $scope: scope,
        $uibModalInstance: $uibModalInstance,
        urlService: {
          resolveFileUrl: () => {}
        }
      })
    })
  })

  it('should exists', () => {
    return expect(!!modalController).toBe(true)
  })
})

