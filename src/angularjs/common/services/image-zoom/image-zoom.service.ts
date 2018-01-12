import * as angular from 'angular'
// TODO refactor: create factory instead of 'createZoomInstance'
export class ImageZoomService {

  private image: HTMLImageElement

  public settings: {
    zoomScale: number,
    fileType: string
  }

  private imageSize: {
    width: number,
    height: number
  }

  private primaryImageSize: {
    width: number,
    height: number
  }

  private resizeZoom: number

  static $inject = [];

  constructor() {
    this.settings = {
      zoomScale: 0.2,
      fileType: ''
    }

    this.imageSize = {
      width: 0,
      height: 0
    }

    this.primaryImageSize = {
      width: 0,
      height: 0
    }

    this.resizeZoom = 1 + this.settings.zoomScale
  }

  public resetImg = (): void => {
    this.updateWidthAndHeight(this.image, this.primaryImageSize)
    this.imageSize.width = this.primaryImageSize.width
    this.imageSize.height = this.primaryImageSize.height
  }

  public destroy = (): void => {
    this.image.removeEventListener('wheel', this.onWheel)
    this.updateWidthAndHeight(this.image, this.primaryImageSize)
  }

  public decreaseImg = (): void => {
    this.imageSize.width /= this.resizeZoom
    this.imageSize.height /= this.resizeZoom
    this.updateWidthAndHeight(this.image, this.imageSize)
  }

  public increaseImg = (): void => {
    this.imageSize.width *= this.resizeZoom
    this.imageSize.height *= this.resizeZoom
    this.updateWidthAndHeight(this.image, this.imageSize)
  }

  private updateWidthAndHeight = (image: any, sizeObject: any): void => {
    image.width = String(sizeObject.width)
    image.height = String(sizeObject.height)
  }

  private onWheel = (event: any): void => {
    let deltaY = 0

    event.preventDefault()

    if (event.deltaY) { // browser compatibility: FireFox 17+ (IE9+, Chrome 31+?)
      deltaY = event.deltaY
    } else if (event.wheelDelta) {
      deltaY = -event.wheelDelta
    }

    if (deltaY < 0) {
      this.imageSize.width *= this.resizeZoom
      this.imageSize.height *= this.resizeZoom
    } else {
      this.imageSize.width /= this.resizeZoom
      this.imageSize.height /= this.resizeZoom
    }

    this.updateWidthAndHeight(this.image, this.imageSize)

  }

  public createZoomInstance = (img: HTMLImageElement): void => {
    if (!img || !img.nodeName || img.nodeName !== 'IMG') {
      return void 0
    }

    this.image = img

    const onLoad = (): void => {
      this.imageSize.width = this.image.width
      this.imageSize.height = this.image.height
      angular.copy(this.imageSize, this.primaryImageSize)
      this.image.addEventListener('wheel', this.onWheel)
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
}
