import * as angular from 'angular';
import { UserAvatarComponent } from './user-avatar.component';
import urlModule from '../../../services/url/url';
import errorImage from '../../../directives/error-img/error-img';

export interface IUserAvatarComponentBindings extends ng.IController {
  imageToken?: string;
}

const userAvatarModule = angular.module('profitelo.components.interface.user-avatar', [
  urlModule,
  errorImage
])
.component('userAvatar', new UserAvatarComponent())
  .name;

export default userAvatarModule;
