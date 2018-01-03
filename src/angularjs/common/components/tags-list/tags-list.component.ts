import {TagsListComponentController} from './tags-list.controller'

export class TagsListComponent implements ng.IComponentOptions {
  controllerAs: '$ctrl'
  controller: ng.Injectable<ng.IControllerConstructor> = TagsListComponentController
  template = require('./tags-list.pug')
  bindings: {[boundProperty: string]: string} = {
    tags: '<',
    title: '@'
  }
}
