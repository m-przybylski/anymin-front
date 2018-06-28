// tslint:disable:readonly-array
import * as angular from 'angular';
import { ProfileGalleryComponent } from './profile-gallery.component';
import profileGalleryPreviewModule from './modals/preview';
import apiModule from 'profitelo-api-ng/api.module';
import errorHandlerModule from '../../../services/error-handler/error-handler';

export interface IProfileGalleryComponentBindings extends ng.IController {
  documents: string[];
}

const profileGalleryModule = angular.module('profitelo.components.interface.profile-gallery', [
  'ui.bootstrap',
  apiModule,
  errorHandlerModule,
  profileGalleryPreviewModule
])
  .component('profileGallery', new ProfileGalleryComponent())
    .name;

export default profileGalleryModule;
