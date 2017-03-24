import * as angular from 'angular'
import {ProfileHeaderComponent} from './profile-header.component'
import './profile-header.sass'
import {GetExpertDetails} from 'profitelo-api-ng/model/models'
import userAvatarModule from '../../interface/user-avatar/user-avatar'
import profileGalleryModule from './profile-gallery/profile-gallery'

export interface IProfileHeaderComponentBindings extends ng.IController {
  profileDetails?: GetExpertDetails,
  isFavourite: boolean,
  onLike: () => void,
  profileType: ProfileTypes
}

export enum  ProfileTypes {
  'company',
  'expert'
}

const profileHeaderModule = angular.module('profitelo.components.profile.profile-header', [
  'profitelo.directives.pro-social-icon-getter',
  userAvatarModule,
  profileGalleryModule
])
.component('profileHeader', new ProfileHeaderComponent())
  .name

export default profileHeaderModule
