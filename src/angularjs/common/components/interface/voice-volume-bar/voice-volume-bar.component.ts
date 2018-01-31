import { VoiceVolumeBarComponentController } from './voice-volume-bar.controller';
// tslint:disable:member-ordering
export class VoiceVolumeBarComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = VoiceVolumeBarComponentController;
  public template = require('./voice-volume-bar.html');
  public transclude = true;
  public bindings: {[boundProperty: string]: string} = {
    stream: '<'
  };
}
