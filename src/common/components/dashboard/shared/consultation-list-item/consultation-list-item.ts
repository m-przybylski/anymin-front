import * as angular from 'angular'
import 'angular-translate'
import {ConsultationListItemComponent} from './consultation-list-item.component'
import './consultation-list-item.sass'
import tagsListModule from '../../../tags-list/tags-list'
import 'common/directives/interface/pro-checkbox/pro-checkbox'
import { Tag } from 'profitelo-api-ng/model/models'

export interface IConsultationListItemComponentBindings extends ng.IController {
  consultationTitle: string
  consultationPrice: string
  consultationTags: Array<Tag>
  consultationInviteTime: string
}

const consultationListItemModule = angular.module('profitelo.components.dashboard.shared.consultation-list-item', [
  'pascalprecht.translate',
  'profitelo.directives.interface.pro-checkbox',
  tagsListModule
])
  .component('consultationListItem', new ConsultationListItemComponent())
  .name

export default consultationListItemModule
