import * as angular from 'angular'
import {TagsListComponent} from './tags-list.component'
import './tags-list.sass'


export interface ITagsListBindings extends ng.IController {

}

const tagsListModule = angular.module('profitelo.components.tags-list', [
])
.component('tagsList', new TagsListComponent())
  .name

export default tagsListModule;
