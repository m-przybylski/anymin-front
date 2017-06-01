import * as angular from 'angular'
import {WizardAvatarComponent} from './wizard-avatar.component'

export interface IWizardAvatarComponentBindings extends ng.IController {
  avatarToken?: string
}

const wizardAvatarModule = angular.module('profitelo.components.wizard.wizard-avatar', [
  'pascalprecht.translate'
])
.component('wizardAvatar', new WizardAvatarComponent)
  .name

export default wizardAvatarModule
