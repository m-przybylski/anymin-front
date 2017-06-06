import * as angular from 'angular'
import {ProfileGalleryComponent} from './profile-gallery.component'
import './profile-gallery.sass'
import profileGalleryPreviewModule from './modals/preview'

export interface IProfileGalleryComponentBindings extends ng.IController {
  documents: Array<string>
}

const profileGalleryModule = angular.module('profitelo.components.interface.profile-gallery', [
  'ui.bootstrap',
  profileGalleryPreviewModule
])
  .component('profileGallery', new ProfileGalleryComponent())
    .name

export default profileGalleryModule
