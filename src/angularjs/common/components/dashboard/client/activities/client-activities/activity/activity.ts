// tslint:disable:no-implicit-dependencies
import * as angular from 'angular';
import { GetClientActivity } from 'profitelo-api-ng/model/models';
import { ClientActivityComponent } from './activity.component';
import modalsModule from '../../../../../../services/modals/modals';
import urlModule from '../../../../../../services/url/url';
import 'angularjs/common/components/complaints/status/status';

export interface IClientActivityComponentBindings {
  activity: GetClientActivity;
}

const clientActivityModule = angular.module('profitelo.components.dashboard.client.activities.client-activity', [
  'pascalprecht.translate',
  urlModule,
  modalsModule,
  'profitelo.components.complaints.status'
])
  .component('clientActivity', new ClientActivityComponent())
  .name;

export default clientActivityModule;
