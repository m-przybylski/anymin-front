(function() {

  function lightboxModelController($scope, $window, $timeout, $uibModalInstance, FilesApi, ImageZoomService, PrintService) {

    this.slideList = $scope.sliders
    this.isPending = false
    let i = 1

    _.forEach(this.slideList, function(value) {
      value.id = i++
    })

    let currentSlideIndex = _.findIndex(this.slideList, (slide) => {
      return slide.token === $scope.slide.token
    })

    this.currentSlide = this.slideList[currentSlideIndex]

    $timeout(() => {
      ImageZoomService.createZoomInstance(angular.element('.modal-dialog img')[currentSlideIndex])
      // angular.element('.modal-dialog').perfectScrollbar() content type pdf
    })

    let fileInfoRequest = (slide) => {
      this.isPending = true
      FilesApi.fileInfoPath({
        token: slide.token
      }).$promise.then((response) => {
        this.currentSlide = slide
        this.isPending = false
        this.navSettings.name = response.name
        this.currentSlide.contentType = response.contentType
      }, (error) => {
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

    const _scrollToTop = () => {
      $timeout(() => {
        angular.element('.modal-dialog').scrollTop(0)
        angular.element('.modal-dialog').perfectScrollbar('update')
      })
    }

    this.sliderActions = {
      nextSlide: () => {
        if (currentSlideIndex  < this.slideList.length - 1 && !this.isPending) {
          let nextSlide = this.slideList[++currentSlideIndex]
          fileInfoRequest(nextSlide)
          _scrollToTop()
          ImageZoomService.destroy(angular.element('.modal-dialog img')[currentSlideIndex])
          ImageZoomService.createZoomInstance(angular.element('.modal-dialog img')[currentSlideIndex])
        }

      },
      prevSlide: () => {
        if (currentSlideIndex > 0 && !this.isPending) {
          let prevSlide = this.slideList[--currentSlideIndex]
          fileInfoRequest(prevSlide)
          _scrollToTop()
          ImageZoomService.destroy(angular.element('.modal-dialog img')[currentSlideIndex])
          ImageZoomService.createZoomInstance(angular.element('.modal-dialog img')[currentSlideIndex])
        }
      },
      decreaseImg: () => {
        ImageZoomService.decreaseImg()
      },
      increaseImg: () => {
        ImageZoomService.increaseImg()
      },
      imageZoomReset: () => {
        ImageZoomService.resetImg()
      }
    }

    this.navSettings = {
      // printFile: () => {
      //   const imgSrc = this.currentSlide.previews[0]
      //   PrintService.print(imgSrc)
      // },
      downloadFile: () => {
        let imageSrc = null
        if (this.currentSlide.contentType !== 'pdf') {
          imageSrc = this.currentSlide.previews[0]
        } else {
          imageSrc = this.currentSlide.previews[0]
        }
        $window.open(imageSrc)

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
    'profitelo.swaggerResources',
    'profitelo.services.helper',
    'profitelo.services.print-service',
    'profitelo.services.image-zoom-service'

  ])
    .controller('lightboxModelController', lightboxModelController)

}())
