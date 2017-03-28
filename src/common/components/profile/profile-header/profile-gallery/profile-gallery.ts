import * as angular from 'angular'
import {ProfileGalleryComponent} from './profile-gallery.component'
import './profile-gallery.sass'

export interface IProfileGalleryComponentBindings extends ng.IController {
}

const profileGalleryModule = angular.module('profitelo.components.profile.profile-gallery', [
  'ui.bootstrap',
  'profitelo.components.profile.profile-header.profile-gallery.modals.preview'
])
  .component('profileGallery', new ProfileGalleryComponent())
    .name

export default profileGalleryModule
