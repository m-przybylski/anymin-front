import * as angular from 'angular'
import filtersModule from '../../../../filters/filters'
import {UserService} from '../../../../services/user/user.service'
import {FinancesApi} from 'profitelo-api-ng/api/api'
import apiModule from 'profitelo-api-ng/api.module'
import userModule from '../../../../services/user/user'
(function() {
  /* @ngInject */
  function controller(userService: UserService, FinancesApi: FinancesApi) {

    userService.getUser().then( (accountDetails) => {
      if (accountDetails.defaultCreditCard) {
        this.isCard = true
      } else {
        FinancesApi.getClientBalanceRoute().then((clientBalance) => {
          this.clientBalance = clientBalance
        }, (error) => {
          throw new Error('Can not get client balance: ' + error)
        })
      }
    })
    return this
  }

  const component = {
    template: require('./navigation.pug')(),
    controller: controller,
    controllerAs: '$ctrl',
    bindings: {
    }
  }

  angular.module('profitelo.components.dashboard.client.navigation', [
    'pascalprecht.translate',
    userModule,
    apiModule,
    filtersModule
  ])
    .component('clientNavigation', component)
}())
