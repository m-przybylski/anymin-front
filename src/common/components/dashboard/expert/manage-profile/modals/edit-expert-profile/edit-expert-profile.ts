import * as angular from 'angular'
import {EditExpertProfileController} from './edit-expert-profile.controller'
import userAvatarModule from '../../../../../interface/user-avatar/user-avatar'
import './edit-expert-profile.sass'
import inputDropdownTagModule from '../../../../../interface/input-dropdown-tag/input-dropdown-tag'

const manageProfileEditProfileModule = angular.module('profitelo.components.dashboard.expert.manage-profile.modals.edit-expert-profile', [
  'ui.bootstrap',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.scrollable',
  'profitelo.directives.service-provider.pro-service-external-links',
  'profitelo.directives.interface.pro-tags-dropdown',
  userAvatarModule,
  inputDropdownTagModule,
  'profitelo.components.interface.dropdown',
  'profitelo.directives.interface.pro-uploader'
])
.controller('editExpertProfile', EditExpertProfileController)
  .name

export default manageProfileEditProfileModule
