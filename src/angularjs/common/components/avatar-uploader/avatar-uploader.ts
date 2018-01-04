import * as angular from 'angular'
import {AvatarUploaderComponent} from './avatar-uploader.component'
import './avatar-uploader.sass'
import ValidationAlertModule from '../interface/alert/validation-alert/validation-alert'
import commonSettingsModule from '../../services/common-settings/common-settings'

export interface IAvatarUploaderComponentBindings extends ng.IController {
  avatarToken?: string
  isValid?: boolean
  validationText?: string
  isSubmitted?: boolean
}

const avatarUploaderModule = angular.module('profitelo.components.avatar-uploader', [
  'pascalprecht.translate',
  'profitelo.components.interface.preloader',
  ValidationAlertModule,
  commonSettingsModule
])
.component('avatarUploader', new AvatarUploaderComponent)
  .name

export default avatarUploaderModule
