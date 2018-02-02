import * as angular from 'angular';
import { ProfileHeaderEditComponent } from './profile-header-edit.component';
import userAvatarModule from '../../../interface/user-avatar/user-avatar';
import profileGalleryModule from '../../../interface/profile-gallery/profile-gallery';
import filtersModule from '../../../../filters/filters';
import modalsModule from '../../../../services/modals/modals';

const profileHeaderEditModule = angular.module('profitelo.components.wizard.profile-header-edit', [
  'profitelo.directives.pro-social-icon-getter',
  userAvatarModule,
  modalsModule,
  profileGalleryModule,
  filtersModule
])
.component('profileHeaderEdit', new ProfileHeaderEditComponent())
  .name;

export default profileHeaderEditModule;
