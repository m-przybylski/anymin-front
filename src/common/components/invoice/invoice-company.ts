import * as angular from 'angular'
import sessionModule from '../../services/session/session'
import {InvoiceCompanyFormComponent} from './invoice-company.component';
import inputModule from '../interface/input/input'
import ValidationAlertModule from '../interface/alert/validation-alert/validation-alert'

const invoiceCompanyFormComponentModule: string = angular.module('profitelo.components.dashboard.invoice', [
  sessionModule,
  inputModule,
  ValidationAlertModule
])
  .component('invoiceCompany', new InvoiceCompanyFormComponent())
  .name

export default invoiceCompanyFormComponentModule
