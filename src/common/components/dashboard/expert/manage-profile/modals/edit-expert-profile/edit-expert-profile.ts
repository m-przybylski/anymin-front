import * as angular from 'angular'
import {EditExpertProfileController} from './edit-expert-profile.controller'
import './edit-expert-profile.sass'
import '../../../../../../directives/interface/pro-tags-dropdown/pro-tags-dropdown.ts'
import inputDropdownTagModule from '../../../../../interface/input-dropdown-tag/input-dropdown-tag'
import wizardLinksModule from '../../../../../wizard/wizard-links/wizard-links'
import inputModule from '../../../../../interface/input/input'
import textareaModule from '../../../../../interface/textarea/textarea'
import wizardAvatarModule from '../../../../../wizard/wizard-avatar/wizard-avatar'
import wizardUploaderModule from '../../../../../wizard/wizard-uploader/wizard-uploader'
import apiModule from 'profitelo-api-ng/api.module'

const manageProfileEditProfileModule = angular.module(
  'profitelo.components.dashboard.expert.manage-profile.modals.edit-expert-profile', [
  'ui.bootstrap',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.pro-tags-dropdown',
  wizardLinksModule,
  inputDropdownTagModule,
  'profitelo.components.interface.dropdown',
  inputModule,
  apiModule,
  textareaModule,
  wizardAvatarModule,
  wizardUploaderModule
])
.controller('editExpertProfile', EditExpertProfileController)
  .name

export default manageProfileEditProfileModule
