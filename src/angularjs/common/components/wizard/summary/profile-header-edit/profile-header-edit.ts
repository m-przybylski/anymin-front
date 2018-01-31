import * as angular from 'angular';
import { ProfileHeaderEditComponent } from './profile-header-edit.component';
import userAvatarModule from '../../../interface/user-avatar/user-avatar';
import profileGalleryModule from '../../../interface/profile-gallery/profile-gallery';
import filtersModule from '../../../../filters/filters';
import translatorModule from '../../../../services/translator/translator';

const profileHeaderEditModule = angular.module('profitelo.components.wizard.profile-header-edit', [
  'profitelo.directives.pro-social-icon-getter',
  userAvatarModule,
  profileGalleryModule,
  filtersModule,
  translatorModule
])
.component('profileHeaderEdit', new ProfileHeaderEditComponent())
  .name;

export default profileHeaderEditModule;
