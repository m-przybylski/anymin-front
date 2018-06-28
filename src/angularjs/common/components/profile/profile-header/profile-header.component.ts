// tslint:disable:no-require-imports
import { ProfileHeaderComponentController } from './profile-header.controller';
// tslint:disable:member-ordering
export class ProfileHeaderComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = ProfileHeaderComponentController;
  public template = require('./profile-header.html');
  public bindings: {[boundProperty: string]: string} = {
    profileDetails: '<',
    isFavourite: '<',
    onLike: '<',
    profileType: '<'
  };
}
