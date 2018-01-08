import * as angular from 'angular'
import {MessengerInputComponent} from './messenger-input.component'

export interface IMessengerInputBindings {
  onSendMessage: (text: string) => void
  onUploadFiles: (files: File[]) => void
  onTyping: () => void
  isFileUploading: boolean
}

const messengerInputModule = angular.module('profitelo.components.communicator.messenger.maximized.messenger-input', [
  'pascalprecht.translate'
])
.component('messengerInput', new MessengerInputComponent())
  .name

export default messengerInputModule;
