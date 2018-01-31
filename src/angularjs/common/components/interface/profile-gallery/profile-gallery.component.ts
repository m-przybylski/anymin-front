import { ProfileGalleryComponentController } from './profile-gallery.controller';

// tslint:disable:member-ordering
export class ProfileGalleryComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = ProfileGalleryComponentController;
  public template = require('./profile-gallery.html');
  public bindings: {[boundProperty: string]: string} = {
    documents: '<'
  };
}
