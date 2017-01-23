(function() {

  function lightboxModelController($scope, $window, lodash: _.LoDashStatic, $timeout, $uibModalInstance, FilesApi, imageZoomService) {

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

    const fileInfoRequest = (slide) => {
      this.isPending = true
      FilesApi.fileInfoPath({
        token: slide.token
      }).$promise.then((response) => {
        this.currentSlide = slide
        this.isPending = false
        this.navSettings.name = response.name
        this.currentSlide.contentType = response.contentType
        this.currentSlide.downloadUrl = response.downloadUrl
        
        imageZoomService.destroy(angular.element('.modal-dialog img')[currentSlideIndex])
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
    'profitelo.swaggerResources',
    'profitelo.services.helper',
    'profitelo.services.print',
    'profitelo.services.image-zoom',
    'ngLodash'

  ])
    .controller('lightboxModelController', lightboxModelController)

}())
