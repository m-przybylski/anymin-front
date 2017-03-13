namespace profitelo.components.interface.imageCrop {

  interface IImageCropComponentBindings extends ng.IController {
    imageSrc?: string
    saveCropAvatar: Function
  }

  class ImageCropComponentController implements IImageCropComponentBindings {

    public imageSrc: string
    public saveCropAvatar: Function

    private element: any

    /* @ngInject */
    constructor() {
      this.element = $('.cropper-container')
    }

    $onChanges = () => {
      if (angular.isDefined(this.imageSrc) && this.imageSrc) {
        this.element.croppie({
          url: this.imageSrc,
          viewport: {
            width: 200,
            height: 200,
            type: 'circle'
          }
        })
      }
    }

    public cropImage = () => {
      this.saveCropAvatar(this.element.croppie('get'))
      this.element.croppie('destroy')
    }

  }

  class ImageCropComponent implements ng.IComponentOptions {
    controller: ng.Injectable<ng.IControllerConstructor> = ImageCropComponentController
    template = require('./image-crop.jade')()
    bindings: {[boundProperty: string]: string} = {
      imageSrc: '<',
      saveCropAvatar: '<'
    }
  }

  angular.module('profitelo.components.interface.image-crop', [
    'pascalprecht.translate'
  ])
  .component('imageCropComponent', new ImageCropComponent())
}
