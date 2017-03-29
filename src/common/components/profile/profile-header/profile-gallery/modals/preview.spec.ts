import * as angular from 'angular'
import {GalleryPreviewController, IGalleryPreviewControllerScope} from './preview'
describe('Testing Controller: galleryPreview', () => {

  let galleryPreview: GalleryPreviewController
  let scope: IGalleryPreviewControllerScope

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  beforeEach(() => {
    angular.mock.module('profitelo.components.profile.profile-header.profile-gallery.modals.preview')
    inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) => {

      scope = <IGalleryPreviewControllerScope>$rootScope.$new()

      galleryPreview = $controller<GalleryPreviewController>('galleryPreview', {
        $scope: scope,
        $uibModalInstance: $uibModalInstance,
        urlService: {
          resolveFileUrl: () => {}
        }
      })
    })
  })

  it('should exists', () => {
    return expect(!!galleryPreview).toBe(true)
  })
})

