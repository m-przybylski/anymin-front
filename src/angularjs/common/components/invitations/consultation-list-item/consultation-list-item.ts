import * as angular from 'angular'
import 'angular-translate'
import {ConsultationListItemComponent} from './consultation-list-item.component'
import { GetServiceWithInvitation } from 'profitelo-api-ng/model/models'
import tagsListModule from '../../tags-list/tags-list'
import filtersModule from '../../../filters/filters'
import checkboxModule from '../../interface/checkbox/checkbox'
import {IGetServiceWithInvitationsAndTags} from '../../../../app/invitations/modal/invitations.controller'

export interface IConsultationListItemComponentBindings extends ng.IController {
  service: IGetServiceWithInvitationsAndTags
  onChange: (service: GetServiceWithInvitation, isChecked: boolean) => void
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
