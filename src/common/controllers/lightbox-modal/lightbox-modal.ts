namespace profitelo.controllers.lightboxModal {

  import IWindowService = profitelo.services.window.IWindowService
  import IImageZoomService = profitelo.services.imageZoom.IImageZoomService
  import IFilesApi = profitelo.api.IFilesApi

  function lightboxModelController($scope: any, $window: IWindowService, lodash: _.LoDashStatic,
                                   $timeout: ng.ITimeoutService, FilesApi: IFilesApi, imageZoomService: IImageZoomService,
                                   $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

    this.slideList = $scope.sliders
    this.isPending = false
    let i = 1

    lodash.forEach(this.slideList, function(value) {
      value.id = i++
    })

    let currentSlideIndex = lodash.findIndex(this.slideList, (slide: {token: string}) => {
      return slide.token === $scope.slide.token
    })

    this.currentSlide = this.slideList[currentSlideIndex]

    $timeout(() => {
      if (this.currentSlide.contentType !== 'application/pdf') {
        imageZoomService.createZoomInstance(angular.element('.modal-dialog img')[currentSlideIndex])
      }
    })

    const _scrollToTop = () => {
      $timeout(() => {
        const elem = angular.element('.modal-dialog')
        elem.scrollTop(0)
        elem.perfectScrollbar('update')
      })
    }

    const fileInfoRequest = (slide: any) => {
      this.isPending = true
      FilesApi.fileInfoPath(slide.token).then((response) => {
          this.currentSlide = slide
          this.isPending = false
          this.navSettings.name = response.name
          this.currentSlide.contentType = response.contentType
          this.currentSlide.downloadUrl = response.downloadUrl

          imageZoomService.destroy(/*angular.element('.modal-dialog img')[currentSlideIndex]*/)
          if ( this.currentSlide.contentType  !== 'application/pdf') {
            imageZoomService.createZoomInstance(angular.element('.modal-dialog img')[currentSlideIndex])
            angular.element('.modal-dialog').perfectScrollbar('destroy')
          } else {
            angular.element('.modal-dialog').perfectScrollbar()
          }
          _scrollToTop()
        }, () => {
          $uibModalInstance.close()
        }
      )
    }

    const keyCodes = {
      arrowRight: 39,
      arrowLeft: 37
    }

    angular.element($window).on('keydown keypress', (event) => {
      const keyCode = event.which || event.keyCode
      switch (keyCode) {

        case keyCodes.arrowLeft:
          this.sliderActions.prevSlide()
          break

        case keyCodes.arrowRight:
          this.sliderActions.nextSlide()
          break

        default:
          break
      }
    })

    fileInfoRequest(this.currentSlide)

    this.sliderActions = {
      nextSlide: () => {
        if (currentSlideIndex  < this.slideList.length - 1 && !this.isPending) {
          const nextSlide = this.slideList[++currentSlideIndex]
          fileInfoRequest(nextSlide)
        }

      },
      prevSlide: () => {
        if (currentSlideIndex > 0 && !this.isPending) {
          const prevSlide = this.slideList[--currentSlideIndex]
          fileInfoRequest(prevSlide)
        }
      },
      decreaseImg: () => {
        imageZoomService.decreaseImg()
      },
      increaseImg: () => {
        imageZoomService.increaseImg()
      },
      imageZoomReset: () => {
        imageZoomService.resetImg()
      }
    }

    this.navSettings = {
      // printFile: () => {
      //   const imgSrc = this.currentSlide.previews[0]
      //   printService.print(imgSrc)
      // },
      downloadFile: () => {
        $window.open(this.currentSlide.downloadUrl)

      },
      closeLightbox: () => {
        $uibModalInstance.close()
      }
    }
    return this
  }

  angular.module('profitelo.common.controller.lightbox-model', [
    'ui.bootstrap',
    'profitelo.components.pro-lightbox',
    'profitelo.api.FilesApi',
    'profitelo.services.url',
    'profitelo.services.print',
    'profitelo.services.image-zoom',
    'ngLodash'

  ])
    .controller('lightboxModelController', lightboxModelController)
}
