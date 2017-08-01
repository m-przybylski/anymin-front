import * as angular from 'angular'
import {EditExpertProfileController} from './edit-expert-profile.controller'
import userAvatarModule from '../../../../../interface/user-avatar/user-avatar'
import './edit-expert-profile.sass'
import '../../../../../../directives/interface/pro-uploader/pro-uploader'
import '../../../../../../directives/interface/pro-tags-dropdown/pro-tags-dropdown.ts'
import inputDropdownTagModule from '../../../../../interface/input-dropdown-tag/input-dropdown-tag'
import wizardLinksModule from '../../../../../wizard/wizard-links/wizard-links'
import inputModule from '../../../../../interface/input/input'
import textareaModule from '../../../../../interface/textarea/textarea'

const manageProfileEditProfileModule = angular.module(
  'profitelo.components.dashboard.expert.manage-profile.modals.edit-expert-profile', [
  'ui.bootstrap',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.pro-tags-dropdown',
  userAvatarModule,
  wizardLinksModule,
  inputDropdownTagModule,
  'profitelo.components.interface.dropdown',
  'profitelo.directives.interface.pro-uploader',
  inputModule,
  textareaModule
])
.controller('editExpertProfile', EditExpertProfileController)
  .name

export default manageProfileEditProfileModule
