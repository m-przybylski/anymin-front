import * as angular from 'angular';
import 'angular-translate';
import { ExpertInvoiceComponent } from './invoice.component';

export interface IExpertInvoiceComponentBindings {}

const expertInvoiceModule = angular.module('profitelo.components.dashboard.expert.invoices.expert-invoice', [
  'pascalprecht.translate'
])
  .component('expertInvoice', new ExpertInvoiceComponent())
  .name;

export default expertInvoiceModule;
