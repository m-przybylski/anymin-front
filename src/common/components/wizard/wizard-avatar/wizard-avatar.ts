import * as angular from 'angular'
import {WizardAvatarComponent} from './wizard-avatar.component'
import './wizard-avatar.sass'
import ValidationAlertModule from '../../interface/alert/validation-alert/validation-alert'

export interface IWizardAvatarComponentBindings extends ng.IController {
  avatarToken?: string
  isValid?: boolean
  validationText?: string
  isSubmitted?: boolean
}

const wizardAvatarModule = angular.module('profitelo.components.wizard.wizard-avatar', [
  'pascalprecht.translate',
  'profitelo.components.interface.preloader',
  ValidationAlertModule
])
.component('wizardAvatar', new WizardAvatarComponent)
  .name

export default wizardAvatarModule
