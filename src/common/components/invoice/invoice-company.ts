import * as angular from 'angular'
import sessionModule from '../../services/session/session'
import {InvoiceCompanyFormComponent} from './invoice-company.component';

const invoiceCompanyFormComponentModule: string = angular.module('profitelo.components.dashboard.invoice', [
  sessionModule
])
  .component('invoiceCompany', new InvoiceCompanyFormComponent())
  .name

export default invoiceCompanyFormComponentModule
