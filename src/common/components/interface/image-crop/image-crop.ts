namespace profitelo.components.interface.imageCrop {

  interface IImageCropComponentBindings extends ng.IController {
    imageSrc?: string
    saveCropAvatar: Function

  }

  class ImageCropComponentController implements IImageCropComponentBindings {

    public imageSrc
    public cropImage
    public saveCropAvatar

    private element: any

    $onInit = () => {
      this.cropImage = () => {
        this.saveCropAvatar(this.element.croppie('get'))
        this.element.croppie('destroy')
      }
    }

    $onChanges = () => {
      if (angular.isDefined(this.imageSrc) && this.imageSrc.length > 0) {
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

    /* @ngInject */
    constructor() {
      this.element = $('.cropper-container')
    }

  }

  class ImageCropComponent implements ng.IComponentOptions {
    controller: ng.Injectable<ng.IControllerConstructor> = ImageCropComponentController
    templateUrl: string = 'components/interface/image-crop/image-crop.tpl.html'
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
