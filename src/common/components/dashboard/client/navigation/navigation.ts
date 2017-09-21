import * as angular from 'angular'
import filtersModule from '../../../../filters/filters'
import {FinancesApi, PaymentsApi} from 'profitelo-api-ng/api/api'
import apiModule from 'profitelo-api-ng/api.module'
import userModule from '../../../../services/user/user'
import {ErrorHandlerService} from '../../../../services/error-handler/error-handler.service'
import errorHandlerModule from '../../../../services/error-handler/error-handler'
import {PromiseService} from '../../../../services/promise/promise.service'
import promiseModule from '../../../../services/promise/promise'
import {ProfiteloWebsocketService} from '../../../../services/profitelo-websocket/profitelo-websocket.service'
import profiteloWebsocketModule from '../../../../services/profitelo-websocket/profitelo-websocket'

(function(): void {
  /* @ngInject */
  function controller(PaymentsApi: PaymentsApi,
                      FinancesApi: FinancesApi,
                      errorHandler: ErrorHandlerService,
                      promiseService: PromiseService,
                      profiteloWebsocket: ProfiteloWebsocketService
                      ): void {

    const loaderDelay = 500
    this.isCard = false
    this.isLoading = true

    profiteloWebsocket.onNewFinancialOperation((data) => {
      this.clientBalance = data.balanceAfter
    })

    PaymentsApi.getCreditCardsRoute().then((response) => {
      if (response && response.length > 0) {
        this.isCard = true
        this.isLoading = false
      } else {
        promiseService.setMinimalDelay(FinancesApi.getClientBalanceRoute(), loaderDelay
        ).then((value) => {
          this.clientBalance = value
          this.isLoading = false
        }).catch((error) => {
          errorHandler.handleServerError(error)
          this.isLoading = false
        })
      }
    })
    return this
  }

  const component = {
    template: require('./navigation.pug')(),
    controller,
    controllerAs: '$ctrl',
    bindings: {
    }
  }

  angular.module('profitelo.components.dashboard.client.navigation', [
    'pascalprecht.translate',
    userModule,
    apiModule,
    filtersModule,
    promiseModule,
    errorHandlerModule,
    profiteloWebsocketModule
  ])
    .component('clientNavigation', component)
}())
