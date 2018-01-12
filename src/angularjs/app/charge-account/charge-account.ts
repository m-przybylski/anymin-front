import * as angular from 'angular'
import 'angularjs/common/directives/interface/scrollable/scrollable'
import 'angularjs/common/components/interface/preloader/preloader'
import 'angularjs/common/components/braintree-form/braintree-form'
import 'angularjs/common/components/dashboard/charge-account/payment-method/payu/payu'
import 'angularjs/common/components/dashboard/charge-account/payment-method/paypal/paypal'
import 'angularjs/common/components/dashboard/charge-account/payment-method/card/card'
import 'angularjs/common/components/dashboard/charge-account/choose-amount-charge/choose-amount-charge'
import 'angularjs/common/components/dashboard/charge-account/payment-method/payment-method'
import {ChargeAccountResolver} from './charge-account.resolver'
import modalsModule from '../../common/services/modals/modals'
import {StateProvider, StateService} from '@uirouter/angularjs'
import uiRouter from '@uirouter/angularjs'

const chargeAccountModule = angular.module('profitelo.controller.charge-account', [
  uiRouter,
  'permission',
  'permission.ui',
  'ngTouch',
  modalsModule
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.charge-account', {
      url: '/charge-account',
      onEnter: (chargeAccountResolver: ChargeAccountResolver, $state: StateService): void => {
        chargeAccountResolver.resolve($state.current.name)
      },
      data: {
        pageTitle: 'PAGE_TITLE.CHARGE_ACCOUNT'
      }
    })
  }])
  .service('chargeAccountResolver', ChargeAccountResolver)
  .name

export default chargeAccountModule
