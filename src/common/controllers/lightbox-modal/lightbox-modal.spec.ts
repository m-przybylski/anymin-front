import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {ImageZoomService} from '../../services/image-zoom/image-zoom.service'
import {FilesApi, FilesApiMock} from 'profitelo-api-ng/api/api'
import {UrlService} from '../../services/url/url.service'
import {IWindowService} from '../../services/window/window.service'

describe('profitelo.common.controller.lightbox-model', () => {
  describe('Testing Controller: LightboxModelController', () => {

    let lightboxModelController: any
    let scope: any
    let httpBackend: ng.IHttpBackendService
    let $timeout: ng.ITimeoutService
    let window: IWindowService
    let FilesApiMock: FilesApiMock
    let imageZoomService: ImageZoomService
    let uibModalInstance = {
      dismiss: () => {

      },
      close: () => {

      }
    }
    let triggerKeyPress = (element: JQuery, keyCode: number) => {
      let e = $.Event('keypress')
      e.which = keyCode
      element.trigger(e)
    }

    let url = 'awesomeUrl/'

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.common.controller.lightbox-model')

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $window: IWindowService,
              _$timeout_: ng.ITimeoutService, urlService: UrlService, _FilesApi_: FilesApi,
              _$httpBackend_: ng.IHttpBackendService, _FilesApiMock_: FilesApiMock) => {
        httpBackend = _$httpBackend_
        scope = $rootScope.$new()
        $timeout = _$timeout_
        FilesApiMock = _FilesApiMock_
        window = $window
        imageZoomService = <any>{
          createZoomInstance: () => {
            return true
          },
          settings: {},
          destroy: () => {
            return true
          },
          decreaseImg: () => {

          },
          increaseImg: () => {

          },
          resetImg: () => {

          }
        }

        scope.sliders = [{
          id: 1,
          'content-type': 'image/jpeg',
          downloadUrl: 'https://files.dev.profitelo.pl/files/5e1d3ff3a59e4b0b9bcbf204f2953750/download',
          token: 'TOKEN-1',
          previews: ['https://files.dev.profitelo.pl/files//5e1d3ff3a59e4b0b9bcbf204f2953750/download/320x320']
        }, {
          id: 2,
          contentType: 'application/pdf',
          downloadUrl: 'https://files.dev.profitelo.pl/files/5e1d3ff3a59e4b0b9bcbf204f2953750/download',
          token: 'TOKEN-2',
          previews: ['https://files.dev.profitelo.pl/files//5e1d3ff3a59e4b0b9bcbf204f2953750/download/320x320']
        }]
        scope.slide = {
          token: 'TOKEN-1'
        }

        lightboxModelController = $controller('lightboxModelController', {
          '$scope': scope,
          '$uibModalInstance': uibModalInstance,
          '$window': window,
          'urlService': urlService,
          'FilesApi': _FilesApi_,
          'imageZoomService': imageZoomService
        })

        //FIXME
        FilesApiMock.fileInfoPath(200, 'TOKEN-1', <any>{})
        $timeout.flush()
        httpBackend.flush()
        triggerKeyPress(angular.element(window), 22)
      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should go to nextSlide and then back prevSlide', () => {
      const startingSlide = lightboxModelController.currentSlide

      //FIXME
      FilesApiMock.fileInfoPath(200, 'TOKEN-2', <any>{contentType: 'application/pdf'})
      FilesApiMock.fileInfoPath(200, 'TOKEN-1', <any>{})

      lightboxModelController.sliderActions.nextSlide()
      httpBackend.flush()
      $timeout.flush()
      expect(startingSlide.id < lightboxModelController.currentSlide.id).toBe(true)

      lightboxModelController.sliderActions.prevSlide()
      httpBackend.flush()
      expect(startingSlide.id < lightboxModelController.currentSlide.id).toBe(false)

    })

    it('should close lightbox on FilesApi error', () => {
      spyOn(uibModalInstance, 'close')
      FilesApiMock.fileInfoPath(500, 'TOKEN-2')
      lightboxModelController.sliderActions.nextSlide()
      httpBackend.flush()
      expect(uibModalInstance.close).toHaveBeenCalled()
    })

    it('should decrease image', () => {
      spyOn(imageZoomService, 'decreaseImg')
      lightboxModelController.sliderActions.decreaseImg()
      expect(imageZoomService.decreaseImg).toHaveBeenCalled()
    })

    it('should increase image', () => {
      spyOn(imageZoomService, 'increaseImg')
      lightboxModelController.sliderActions.increaseImg()
      expect(imageZoomService.increaseImg).toHaveBeenCalled()
    })

    it('should reset image size', () => {
      spyOn(imageZoomService, 'resetImg')
      lightboxModelController.sliderActions.imageZoomReset()
      expect(imageZoomService.resetImg).toHaveBeenCalled()
    })


    it('should download file', () => {
      spyOn(window, 'open')
      lightboxModelController.navSettings.downloadFile()
      expect(window.open).toHaveBeenCalledWith(lightboxModelController.currentSlide.downloadUrl)
    })

    it('should close lightbox', () => {
      spyOn(uibModalInstance, 'close')
      lightboxModelController.navSettings.closeLightbox()
      expect(uibModalInstance.close).toHaveBeenCalled()
    })

    it('should call next slide on right-arrow key press', () => {
      spyOn(lightboxModelController.sliderActions, 'nextSlide')
      triggerKeyPress(angular.element(window), 39)
      expect(lightboxModelController.sliderActions.nextSlide).toHaveBeenCalled()
    })

    it('should call prev slide on left-arrow key press', () => {
      spyOn(lightboxModelController.sliderActions, 'prevSlide')
      triggerKeyPress(angular.element(window), 37)
      expect(lightboxModelController.sliderActions.prevSlide).toHaveBeenCalled()
    })

  })
})
