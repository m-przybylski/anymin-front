import { VoiceVolumeBarComponentController } from './voice-volume-bar.controller';
export class VoiceVolumeBarComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = VoiceVolumeBarComponentController;
  template = require('./voice-volume-bar.html');
  transclude: boolean = true;
  bindings: {[boundProperty: string]: string} = {
    stream: '<'
  };
}
