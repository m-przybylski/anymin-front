import * as angular from 'angular';
import { ProfileHeaderComponent } from './profile-header.component';
import userAvatarModule from '../../interface/user-avatar/user-avatar';
import profileGalleryModule from '../../interface/profile-gallery/profile-gallery';
import filtersModule from '../../../filters/filters';

const profileHeaderModule = angular.module('profitelo.components.profile.profile-header', [
  'profitelo.directives.pro-social-icon-getter',
  userAvatarModule,
  profileGalleryModule,
  filtersModule
])
.component('profileHeader', new ProfileHeaderComponent())
  .name;

export default profileHeaderModule;
