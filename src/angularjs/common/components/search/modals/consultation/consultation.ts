import * as angular from 'angular';
import apiModule from 'profitelo-api-ng/api.module';
import { ConsultationModalController } from './consultation.controller';
import tagsListModule from '../../../tags-list/tags-list';

const consultationModalModule = angular.module(
  'profitelo.components.search.modals.consultation', [
  'ui.bootstrap',
  apiModule,
  'profitelo.components.interface.preloader',
  tagsListModule
])
.controller('consultationModalController', ConsultationModalController)
.name;

export default consultationModalModule;
