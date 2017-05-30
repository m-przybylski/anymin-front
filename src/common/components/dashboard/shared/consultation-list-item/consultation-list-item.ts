import * as angular from 'angular'
import 'angular-translate'
import {ConsultationListItemComponent} from './consultation-list-item.component'
import './consultation-list-item.sass'
import tagsListModule from '../../../tags-list/tags-list'
import { Tag } from 'profitelo-api-ng/model/models'
import {MoneyDto} from 'profitelo-api-ng/model/models'
import filtersModule from '../../../../filters/filters'
import checkboxModule from '../../../interface/checkbox/checkbox'

export interface IConsultationListItemComponentBindings extends ng.IController {
  consultationTitle: string
  consultationPrice: MoneyDto
  consultationTags: Array<Tag>
  consultationInviteTime: string
}

const consultationListItemModule = angular.module('profitelo.components.dashboard.shared.consultation-list-item', [
  'pascalprecht.translate',
  tagsListModule,
  filtersModule,
  checkboxModule
])
  .component('consultationListItem', new ConsultationListItemComponent())
  .name

export default consultationListItemModule
