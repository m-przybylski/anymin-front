import * as angular from 'angular'
import {TagsListComponent} from './tags-list.component'
import './tags-list.sass'
import 'angular-translate'

export interface ITagsListBindings extends ng.IController {

}

const tagsListModule = angular.module('profitelo.components.tags-list', [
  'pascalprecht.translate'
])
.component('tagsList', new TagsListComponent())
  .name

export default tagsListModule;
