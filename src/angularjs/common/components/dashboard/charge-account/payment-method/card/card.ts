import * as angular from 'angular'
import {CardPaymentFormComponent} from './card.component';
import uiRouter from '@uirouter/angularjs'

const cardModule: string = angular.module('profitelo.components.dashboard.charge-account.payment-method.card', [
  'pascalprecht.translate',
    uiRouter,
    'profitelo.components.interface.preloader',
  'profitelo.components.braintree-form',
])
  .component('cardPaymentForm', new CardPaymentFormComponent())
  .name

export default cardModule
