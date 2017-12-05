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

  it('should set position od modal for firefox', () => {
    DetectRTC.browser.isFirefox = true
    createModalController()
    expect(modalController.iconPosition.left).toEqual('330px')
    expect(modalController.iconPosition.top).toEqual('240px')
  })

  it('should set position od modal for edge', () => {
    DetectRTC.browser.isEdge = true
    createModalController()
    expect(modalController.isEdge).toBe(true)
    expect(modalController.iconPosition.left).toEqual('0px')
    expect(modalController.iconPosition.bottom).toEqual('120px')
  })

  it('should set position od modal for opera', () => {
    DetectRTC.browser.isOpera = true
    createModalController()
    expect(modalController.iconPosition.left).toEqual('50%')
    expect(modalController.iconPosition.top).toEqual('190px')
  })

  it('should set position od modal for chrome', () => {
    DetectRTC.browser.isChrome = true
    createModalController()
    expect(modalController.iconPosition.left).toEqual('330px')
    expect(modalController.iconPosition.top).toEqual('145px')
  })
})

