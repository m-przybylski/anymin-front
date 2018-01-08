import * as angular from 'angular'
import {TagsListComponent} from './tags-list.component'
import 'angular-translate'
import { Tag } from 'profitelo-api-ng/model/models'

export interface ITagsListBindings extends ng.IController {
  tags: Tag[]
}

const tagsListModule = angular.module('profitelo.components.tags-list', [
  'pascalprecht.translate'
])
.component('tagsList', new TagsListComponent())
  .name

export default tagsListModule;
