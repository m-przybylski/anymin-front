import * as angular from 'angular';
import 'angular-translate';
import { ConsultationListItemComponent } from './invite-employee-consultation-list-item.component';
import tagsListModule from '../../../../../../tags-list/tags-list';
import filtersModule from '../../../../../../../filters/filters';
import checkboxModule from '../../../../../../interface/checkbox/checkbox';
import { IGetServiceWithInvitationsWithTags } from './invite-employee-consultation-list-item.controller';

export interface IInviteEmployeeConsultationListItemComponentBindings extends ng.IController {
  service: IGetServiceWithInvitationsWithTags;
  onChange: (service: IGetServiceWithInvitationsWithTags, isChecked: boolean) => void;
}

const inviteEmployeeConsultationListItemModule =
  angular.module('profitelo.components.dashboard.shared.invite-employee-consultation-list-item', [
  'pascalprecht.translate',
  tagsListModule,
  filtersModule,
  checkboxModule
])
  .component('inviteEmployeeConsultationListItem', new ConsultationListItemComponent())
  .name;

export default inviteEmployeeConsultationListItemModule;
