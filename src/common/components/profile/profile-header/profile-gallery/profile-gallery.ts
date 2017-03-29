import * as angular from 'angular'
import {ProfileGalleryComponent} from './profile-gallery.component'
import './profile-gallery.sass'
import profileGalleryPreviewModule from './modals/preview'
import {ProfileDocument} from 'profitelo-api-ng/model/models'

export interface IProfileGalleryComponentBindings extends ng.IController {
  documents: Array<ProfileDocument>
}

const profileGalleryModule = angular.module('profitelo.components.profile.profile-gallery', [
  'ui.bootstrap',
  profileGalleryPreviewModule
])
  .component('profileGallery', new ProfileGalleryComponent())
    .name

export default profileGalleryModule
