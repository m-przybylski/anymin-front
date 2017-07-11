import * as angular from 'angular'
import {RtcDetectorModalController, IRtcDetectorModalControllerScope} from './rtc-detector-blocked.controller'
import rtcDetectorModal from './rtc-detector-blocked'

describe('Testing Controller: rtcDetectorModal', () => {

  let galleryPreview: RtcDetectorModalController
  let scope: IRtcDetectorModalControllerScope

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  beforeEach(() => {
    angular.mock.module(rtcDetectorModal)
    inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) => {

      scope = <IRtcDetectorModalControllerScope>$rootScope.$new()

      galleryPreview = $controller<RtcDetectorModalController>('rtcDetectorModal', {
        $scope: scope,
        $uibModalInstance: $uibModalInstance,
        urlService: {
          resolveFileUrl: () => {}
        }
      })
    })
  })

  it('should exists', () => {
    return expect(!!galleryPreview).toBe(true)
  })
})

