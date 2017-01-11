describe('profitelo.common.controller.lightbox-model', () => {
  describe('Testing Controller: LightboxModelController', () => {

    let lightboxModelController
    let scope
    let httpBackend
    let $timeout
    let window
    let resourcesExpectations
    let FilesApiDef
    let ImageZoomService
    let uibModalInstance = {
      dismiss: () => {

      },
      close: () => {

      }
    }
    let triggerKeyPress =  (element, keyCode) => {
      var e = $.Event('keypress')
      e.which = keyCode
      element.trigger(e)
    }

    let url = 'awesomeUrl/'
    
    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.common.controller.lightbox-model')
    angular.mock.module('profitelo.swaggerResources.definitions')

      inject(($rootScope, $controller, $window, _$timeout_,  HelperService, _FilesApi_, _lodash_, _$httpBackend_, _FilesApiDef_) => {
        httpBackend = _$httpBackend_
        scope = $rootScope.$new()
        $timeout = _$timeout_
        FilesApiDef = _FilesApiDef_
        window = $window
        ImageZoomService = {
          createZoomInstance: () => {
            return true
          },
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
          'HelperService': HelperService,
          'FilesApi': _FilesApi_,
          'lodash': _lodash_,
          'ImageZoomService': ImageZoomService
        })


        resourcesExpectations = {
          FilesApi: {
            fileInfoPath: httpBackend.when(FilesApiDef.fileInfoPath.method, FilesApiDef.fileInfoPath.url.replace(':token', 'TOKEN-1')),
            fileInfoPathNextSlide: httpBackend.when(FilesApiDef.fileInfoPath.method, FilesApiDef.fileInfoPath.url.replace(':token', 'TOKEN-2'))
          }
        }

        resourcesExpectations.FilesApi.fileInfoPath.respond(200)
        $timeout.flush()
        httpBackend.flush()
        triggerKeyPress(angular.element(window), 22)
      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })
    
    it('should go to nextSlide and then back prevSlide', () => {
      const startingSlide= lightboxModelController.currentSlide

      resourcesExpectations.FilesApi.fileInfoPathNextSlide.respond(200, {contentType: 'application/pdf'})
      resourcesExpectations.FilesApi.fileInfoPath.respond(200)
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
      resourcesExpectations.FilesApi.fileInfoPathNextSlide.respond(500)
      lightboxModelController.sliderActions.nextSlide()
      httpBackend.flush()
      expect(uibModalInstance.close).toHaveBeenCalled()
    })

    it('should decrease image', () => {
      spyOn(ImageZoomService, 'decreaseImg')
      lightboxModelController.sliderActions.decreaseImg()
      expect(ImageZoomService.decreaseImg).toHaveBeenCalled()
    })

    it('should increase image', () => {
      spyOn(ImageZoomService, 'increaseImg')
      lightboxModelController.sliderActions.increaseImg()
      expect(ImageZoomService.increaseImg).toHaveBeenCalled()
    })

    it('should reset image size', () => {
      spyOn(ImageZoomService, 'resetImg')
      lightboxModelController.sliderActions.imageZoomReset()
      expect(ImageZoomService.resetImg).toHaveBeenCalled()
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