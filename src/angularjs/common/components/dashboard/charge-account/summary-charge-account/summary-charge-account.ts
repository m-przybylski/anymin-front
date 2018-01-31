import * as angular from 'angular';
import { MoneyDto } from 'profitelo-api-ng/model/models';
import filtersModule from '../../../../filters/filters';
import { SummaryChargeAccountComponent } from './summary-charge-account.component';

export interface ISummaryChargeAccountComponentBindings {
  amount: MoneyDto;
}

const summaryChargeAccountModule: string = angular.module(
  'profitelo.components.dashboard.charge-account.summary-charge-account', [
  'pascalprecht.translate',
  filtersModule
])
  .component('summaryChargeAccount', new SummaryChargeAccountComponent())
  .name;

export default summaryChargeAccountModule;
