// tslint:disable:readonly-array
// tslint:disable:no-import-side-effect
import * as angular from 'angular';
import { TagsListComponent } from './tags-list.component';
import 'angular-translate';
import { GetTag } from 'profitelo-api-ng/model/models';

export interface ITagsListBindings extends ng.IController {
  tags: GetTag[];
}

const tagsListModule = angular.module('profitelo.components.tags-list', [
  'pascalprecht.translate'
])
.component('tagsList', new TagsListComponent())
  .name;

export default tagsListModule;
