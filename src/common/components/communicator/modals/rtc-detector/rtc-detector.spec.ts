import * as angular from 'angular'
import {RtcDetectorModalController, IRtcDetectorModalControllerScope} from './rtc-detector.controller'
import rtcDetectorModal from './rtc-detector'

describe('Testing Controller: rtcDetectorModal', () => {

  let modalController: RtcDetectorModalController
  let scope: IRtcDetectorModalControllerScope

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  beforeEach(() => {
    angular.mock.module(rtcDetectorModal)
    inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) => {

      scope = <IRtcDetectorModalControllerScope>$rootScope.$new()

      modalController = $controller<RtcDetectorModalController>('rtcDetectorModal', {
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

