import * as angular from 'angular';
import { GalleryPreviewController } from './preview.controller';

const profileGalleryPreviewModule = angular.module(
  'profitelo.components.profile.profile-header.profile-gallery.modals.preview', [
  'ui.bootstrap'
])
  .controller('galleryPreview', GalleryPreviewController)
    .name;

export default profileGalleryPreviewModule;
