import * as angular from 'angular'
import {ProfileHeaderComponent} from './profile-header.component'
import './profile-header.sass'

export interface IProfileHeaderComponentBindings extends ng.IController{
}

const profileHeaderModule = angular.module('profitelo.components.profile.profile-header', [
])
.component('profileHeader', new ProfileHeaderComponent())
  .name

export default profileHeaderModule
