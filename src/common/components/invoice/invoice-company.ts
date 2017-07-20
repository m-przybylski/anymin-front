import * as angular from 'angular'
import sessionModule from '../../services/session/session'
import {InvoiceCompanyFormComponent} from './invoice-company.component';
import inputModule from '../interface/input/input'

const invoiceCompanyFormComponentModule: string = angular.module('profitelo.components.dashboard.invoice', [
  sessionModule,
  inputModule
])
  .component('invoiceCompany', new InvoiceCompanyFormComponent())
  .name

export default invoiceCompanyFormComponentModule
