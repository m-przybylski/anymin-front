import * as angular from 'angular'

export interface IGalleryPreviewControllerScope extends ng.IScope {
  reject: () => void
  accept: () => void
  sliders: string
}

export class GalleryPreviewController implements ng.IController {
  preview: string
  reject: () => void
  accept: () => void

  /* @ngInject */
  constructor($scope: IGalleryPreviewControllerScope,
              $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

    this.reject = () => {
      $uibModalInstance.dismiss('cancel')
      $scope.$parent.reject()
    }

    this.accept = () => {
      $uibModalInstance.dismiss('cancel')
      $scope.$parent.accept()
    }

    this.preview = $scope.sliders
  }
}

angular.module('profitelo.components.profile.profile-header.profile-gallery.modals.preview', [
  'ui.bootstrap'
])
.controller('galleryPreview', GalleryPreviewController)

