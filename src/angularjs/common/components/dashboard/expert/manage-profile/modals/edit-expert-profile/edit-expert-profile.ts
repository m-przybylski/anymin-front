import * as angular from 'angular'
import {EditExpertProfileController} from './edit-expert-profile.controller'
import './edit-expert-profile.sass'
import '../../../../../../directives/interface/pro-tags-dropdown/pro-tags-dropdown.ts'
import inputDropdownTagModule from '../../../../../interface/input-dropdown-tag/input-dropdown-tag'
import inputLinksModule from '../../../../../interface/input-links/input-links'
import inputModule from '../../../../../interface/input/input'
import textareaModule from '../../../../../interface/textarea/textarea'
import avatarUploaderModule from '../../../../../avatar-uploader/avatar-uploader'
import fileUploaderModule from '../../../../../file-uploader/file-uploader'
import apiModule from 'profitelo-api-ng/api.module'
import translatorModule from '../../../../../../services/translator/translator'

const manageProfileEditProfileModule = angular.module(
  'profitelo.components.dashboard.expert.manage-profile.modals.edit-expert-profile', [
  'ui.bootstrap',
  'profitelo.components.interface.preloader',
  'profitelo.directives.interface.pro-tags-dropdown',
  inputLinksModule,
  inputDropdownTagModule,
  'profitelo.components.interface.dropdown',
  inputModule,
  apiModule,
  textareaModule,
  avatarUploaderModule,
  fileUploaderModule,
  translatorModule
])
.controller('editExpertProfile', EditExpertProfileController)
  .name

export default manageProfileEditProfileModule
