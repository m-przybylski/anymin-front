(function() {
  /* istanbul ignore next function*/
  function ImageZoomService() {

    this.image = null

    const settings = {
      zoomScale: 0.2,
      fileType: null
    }

    const imageSize = {
      width: null,
      height: null
    }
    
    const primaryImageSize = {
      width: null,
      height: null
    }
    
    const resizeZoom = 1 + settings.zoomScale

    const updateWidthAndHeight = (image, sizeObject) => {
      image.width = String(sizeObject.width)
      image.height = String(sizeObject.height)
    }

    const onWheel = (event) => {
      let deltaY = 0

      event.preventDefault()

      if (event.deltaY) { // browser compatibility: FireFox 17+ (IE9+, Chrome 31+?)
        deltaY = event.deltaY
      } else if (event.wheelDelta) {
        deltaY = -event.wheelDelta
      }

      if (deltaY < 0) {
        imageSize.width  *= resizeZoom
        imageSize.height *= resizeZoom
      } else {
        imageSize.width  /=  resizeZoom
        imageSize.height /=  resizeZoom
      }

      updateWidthAndHeight(this.image, imageSize)

    }

    const _setZoomOnImages = (img) => {
      if (!img || !img.nodeName || img.nodeName !== 'IMG') {
        return void 0
      }

      this.image = img

      const onLoad = () => {
        imageSize.width = parseInt(this.image.width, 10)
        imageSize.height = parseInt(this.image.height, 10)
        angular.copy(imageSize, primaryImageSize)
        this.image.addEventListener('wheel', onWheel)
      }

      // TODO: ARRAY
      // if (typeof img !== 'function') {
      //   return function(elements) {
      //     return elements
      //   }
      // } else {
      //   return function(elements) {
      //     if (elements && elements.length) {
      //       Array.prototype.forEach.call(elements, onLoad)
      //     } else if (elements && elements.nodeName) {
      //       onLoad()
      //     }
      //     return elements;
      //   }
      // }

      onLoad()

    }

    const _destroy = () => {
      this.image.removeEventListener('wheel', onWheel)
      updateWidthAndHeight(this.image, primaryImageSize)
    }

    const _decreaseImage = () => {
      imageSize.width  /= resizeZoom
      imageSize.height /= resizeZoom
      updateWidthAndHeight(this.image, imageSize)
    }

    const _increaseImage = () => {
      imageSize.width  *= resizeZoom
      imageSize.height *= resizeZoom
      updateWidthAndHeight(this.image, imageSize)
    }



    return {
      createZoomInstance: (img) => {
        _setZoomOnImages(img)
      },
      destroy: () => {
        _destroy()
      },
      settings: settings,
      decreaseImg: () => {
        _decreaseImage()
      },
      increaseImg: () => {
        _increaseImage()
      },
      resetImg: () => {
        updateWidthAndHeight(this.image, primaryImageSize)
        imageSize.width = primaryImageSize.width
        imageSize.height = primaryImageSize.height
      }

    }
  }

  angular.module('profitelo.services.image-zoom-service', [
  ])
    .service('ImageZoomService', ImageZoomService)

}())