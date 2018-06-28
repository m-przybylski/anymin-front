// tslint:disable:no-require-imports
import { ProfileHeaderEditComponentController } from './profile-header-edit.controller';

// tslint:disable:member-ordering
export class ProfileHeaderEditComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = ProfileHeaderEditComponentController;
  public template = require('./profile-header-edit.html');
  public bindings: {[boundProperty: string]: string} = {
    profileDetails: '<',
    profileType: '<',
    onDelete: '<',
    onEdit: '<'
  };
}
