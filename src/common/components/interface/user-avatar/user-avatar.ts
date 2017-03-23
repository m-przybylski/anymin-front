import * as angular from 'angular'
import {UserAvatarComponent} from './user-avatar.component'
import urlModule from '../../../services/url/url'

export interface IUserAvatarComponentBindings extends ng.IController {
  imageToken?: string
}

const userAvatarModule = angular.module('profitelo.components.interface.user-avatar', [
  urlModule
])
.component('userAvatar', new UserAvatarComponent())
  .name

export default userAvatarModule
