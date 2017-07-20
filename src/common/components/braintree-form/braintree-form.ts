import * as angular from 'angular'
import apiModule from 'profitelo-api-ng/api.module'
import {JValue} from 'profitelo-api-ng/model/models'
import userModule from '../../services/user/user'
import {ITransaction} from '../dashboard/charge-account/payment-method/card/card.controller'
import 'angular-sanitize'
import filtersModule from '../../filters/filters'
import commonSettingsModule from '../../services/common-settings/common-settings'
import '../../components/dashboard/charge-account/summary-charge-account/summary-charge-account'
import checkboxModule from '../interface/checkbox/checkbox'
import {BraintreeFormComponent} from './braintree-form.component';
import inputModule from '../interface/input/input'

export interface IBraintreeFormComponentBindings {
  onBraintreeFormLoad: () => void,
  submitButtonTranslate: string,
  onFormSucceed: (response: ng.IPromise<JValue>) => void,
  transaction?: ITransaction
}

const braintreeFormModule = angular.module('profitelo.components.braintree-form', [
  'pascalprecht.translate',
  'ngSanitize',
  filtersModule,
  commonSettingsModule,
  userModule,
  apiModule,
  'profitelo.components.dashboard.charge-account.summary-charge-account',
  checkboxModule,
  inputModule
])
  .component('braintreeForm', new BraintreeFormComponent())
  .name

export default braintreeFormModule
