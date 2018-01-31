import { UserAvatarComponentController } from './user-avatar.controller';
// tslint:disable:member-ordering
export class UserAvatarComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = UserAvatarComponentController;
  public template = require('./user-avatar.html');
  public transclude: boolean = true;
  public bindings: {[boundProperty: string]: string} = {
    imageToken: '<'
  };
}
