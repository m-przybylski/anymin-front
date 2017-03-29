import * as angular from 'angular'
import {ProfileGalleryComponent} from './profile-gallery.component'
import './profile-gallery.sass'
import {ProfileDocument} from 'profitelo-api-ng/model/models'

export interface IProfileGalleryComponentBindings extends ng.IController {
  documents: Array<ProfileDocument>
}

const profileGalleryModule = angular.module('profitelo.components.profile.profile-gallery', [
  'ui.bootstrap',
  'profitelo.components.profile.profile-header.profile-gallery.modals.preview'
])
  .component('profileGallery', new ProfileGalleryComponent())
    .name

export default profileGalleryModule
