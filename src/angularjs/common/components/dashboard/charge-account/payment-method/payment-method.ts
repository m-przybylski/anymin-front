import * as angular from 'angular';
import paypalModule from './paypal/paypal';
import { PaymentMethodComponent } from './payment-method.component';

const paymentMethodModule = angular.module('profitelo.components.dashboard.charge-account.payment-method', [
  paypalModule
])
  .component('paymentMethod', new PaymentMethodComponent())
  .name;

export default paymentMethodModule;
