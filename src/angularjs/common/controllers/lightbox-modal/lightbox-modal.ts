import * as angular from 'angular';
import * as _ from 'lodash';
import apiModule from 'profitelo-api-ng/api.module';
import { FilesApi } from 'profitelo-api-ng/api/api';
import { ImageZoomService } from '../../services/image-zoom/image-zoom.service';
import { IWindowService } from '../../services/window/window.service';
import urlModule from '../../services/url/url';
import printModule from '../../services/print/print';
import imageZoomModule from '../../services/image-zoom/image-zoom';
import { keyboardCodes } from '../../classes/keyboard';

function lightboxModelController($scope: any, $window: IWindowService,
                                 $timeout: ng.ITimeoutService, FilesApi: FilesApi, imageZoomService: ImageZoomService,
                                 $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance): void {

  this.slideList = $scope.sliders;
  this.isPending = false;
  let i = 1;

  _.forEach(this.slideList, function (value): void {
    value.id = i++;
  });

  let currentSlideIndex = _.findIndex(this.slideList, (slide: {token: string}) => slide.token === $scope.slide.token);

  this.currentSlide = this.slideList[currentSlideIndex];

  $timeout(() => {
    if (this.currentSlide.contentType !== 'application/pdf') {
      imageZoomService.createZoomInstance(<any>angular.element('.modal-dialog img')[currentSlideIndex]);
    }
  });

  const _scrollToTop = (): void => {
    $timeout(() => {
      const elem = angular.element('.modal-dialog');
      elem.scrollTop(0);
      elem.perfectScrollbar('update');
    });
  };

  const fileInfoRequest = (slide: any): void => {
    this.isPending = true;
    FilesApi.fileInfoPath(slide.token).then((response) => {
        this.currentSlide = slide;
        this.isPending = false;
        this.navSettings.name = response.name;
        this.currentSlide.contentType = response.contentType;
        this.currentSlide.downloadUrl = response.downloadUrl;

        imageZoomService.destroy(/*angular.element('.modal-dialog img')[currentSlideIndex]*/);
        if (this.currentSlide.contentType !== 'application/pdf') {
          imageZoomService.createZoomInstance(<any>angular.element('.modal-dialog img')[currentSlideIndex]);
          angular.element('.modal-dialog').perfectScrollbar('destroy');
        } else {
          angular.element('.modal-dialog').perfectScrollbar();
        }
        _scrollToTop();
      }, () => {
        $uibModalInstance.close();
      }
    );
  };

  angular.element($window).on('keydown keypress', (event) => {
    const keyCode = event.which || event.keyCode;
    switch (keyCode) {

      case keyboardCodes.arrowLeft:
        this.sliderActions.prevSlide();
        break;

      case keyboardCodes.arrowRight:
        this.sliderActions.nextSlide();
        break;

      default:
        break;
    }
  });

  fileInfoRequest(this.currentSlide);

  this.sliderActions = {
    nextSlide: (): void => {
      if (currentSlideIndex < this.slideList.length - 1 && !this.isPending) {
        const nextSlide = this.slideList[++currentSlideIndex];
        fileInfoRequest(nextSlide);
      }

    },
    prevSlide: (): void => {
      if (currentSlideIndex > 0 && !this.isPending) {
        const prevSlide = this.slideList[--currentSlideIndex];
        fileInfoRequest(prevSlide);
      }
    },
    decreaseImg: (): void => {
      imageZoomService.decreaseImg();
    },
    increaseImg: (): void => {
      imageZoomService.increaseImg();
    },
    imageZoomReset: (): void => {
      imageZoomService.resetImg();
    }
  };

  this.navSettings = {
    // printFile: () => {
    //   const imgSrc = this.currentSlide.previews[0]
    //   printService.print(imgSrc)
    // },
    downloadFile: (): void => {
      $window.open(this.currentSlide.downloadUrl);

    },
    closeLightbox: (): void => {
      $uibModalInstance.close();
    }
  };
  return this;
}

angular.module('profitelo.common.controller.lightbox-model', [
  'ui.bootstrap',
  'profitelo.components.pro-lightbox',
  apiModule,
  urlModule,
  printModule,
  imageZoomModule,

])
  .controller('lightboxModelController', ['$scope', '$window', '$timeout', 'FilesApi',
    'imageZoomService', '$uibModalInstance', lightboxModelController]);
