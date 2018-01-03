import * as angular from 'angular'
import {RtcDetectorModalController, IRtcDetectorModalControllerScope} from './rtc-detector.controller'
import rtcDetectorModal from './rtc-detector'
const DetectRTC = require('detectrtc');

describe('Testing Controller: rtcDetectorModal', () => {

  let modalController: RtcDetectorModalController
  let scope: IRtcDetectorModalControllerScope
  let controller: ng.IControllerService
  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  const createModalController = (): void => {
    modalController = controller<RtcDetectorModalController>('rtcDetectorModal', {
      $scope: scope,
      $uibModalInstance: $uibModalInstance,
      urlService: {
        resolveFileUrl: () => {}
      }
    })
    DetectRTC.browser = {}
  }

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('DetectRTC', DetectRTC)
  }))

  beforeEach(() => {
    angular.mock.module(rtcDetectorModal)
    inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) => {
      controller = $controller
      scope = <IRtcDetectorModalControllerScope>$rootScope.$new()
      createModalController()
    })
  })

  it('should exists', () => {
    expect(modalController).toBeTruthy()
  })
})

