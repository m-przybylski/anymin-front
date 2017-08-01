import * as angular from 'angular'
import 'common/directives/interface/scrollable/scrollable'
import 'common/components/interface/preloader/preloader'
import 'common/components/braintree-form/braintree-form'
import 'common/components/dashboard/charge-account/payment-method/payu/payu'
import 'common/components/dashboard/charge-account/payment-method/paypal/paypal'
import 'common/components/dashboard/charge-account/payment-method/card/card'
import 'common/components/dashboard/charge-account/choose-amount-charge/choose-amount-charge'
import 'common/components/dashboard/charge-account/payment-method/payment-method'
import {ChargeAccountResolver} from './charge-account.resolver'
import modalsModule from '../../common/services/modals/modals'

const chargeAccountModule = angular.module('profitelo.controller.charge-account', [
  'ui.router',
  'permission',
  'permission.ui',
  'ngTouch',
  modalsModule
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state('app.charge-account', {
    url: '/charge-account',
    onEnter: (chargeAccountResolver: ChargeAccountResolver,  $state: ng.ui.IStateService): void => {
      chargeAccountResolver.resolve($state.current.name)
    },
    data: {
      pageTitle: 'PAGE_TITLE.CHARGE_ACCOUNT'
    }
  })
})
  .service('chargeAccountResolver', ChargeAccountResolver)
    .name

  export default chargeAccountModule
