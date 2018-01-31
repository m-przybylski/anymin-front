import { TagsListComponentController } from './tags-list.controller';

// tslint:disable:member-ordering
export class TagsListComponent implements ng.IComponentOptions {
  public controllerAs: '$ctrl';
  public controller: ng.Injectable<ng.IControllerConstructor> = TagsListComponentController;
  public template = require('./tags-list.html');
  public bindings: {[boundProperty: string]: string} = {
    tags: '<',
    title: '@'
  };
}
