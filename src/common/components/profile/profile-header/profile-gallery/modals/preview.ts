import * as angular from 'angular'
import {UrlService} from '../../../../../services/url/url.service'

export interface IGalleryPreviewControllerScope extends ng.IScope {
  token: string
}

export class GalleryPreviewController implements ng.IController {

  /* @ngInject */
  constructor(private urlService: UrlService) {
  }

  public createUrl = (imageToken: string) => {
    if (imageToken) {
      return this.urlService.resolveFileUrl(imageToken)
    } else {
      return 'no-image'
    }
  }
}

angular.module('profitelo.components.profile.profile-header.profile-gallery.modals.preview', [
  'ui.bootstrap'
])
.controller('galleryPreview', GalleryPreviewController)

