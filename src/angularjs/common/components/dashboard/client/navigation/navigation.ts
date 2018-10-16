// tslint:disable:strict-boolean-expressions
// tslint:disable:only-arrow-functions
// tslint:disable:no-shadowed-variable
// tslint:disable:no-require-imports
// tslint:disable:no-invalid-this
// tslint:disable:newline-before-return
import * as angular from 'angular';
import filtersModule from '../../../../filters/filters';
import { FinancesApi, PaymentsApi } from 'profitelo-api-ng/api/api';
import apiModule from 'profitelo-api-ng/api.module';
import userModule from '../../../../services/user/user';
import { ErrorHandlerService } from '../../../../services/error-handler/error-handler.service';
import errorHandlerModule from '../../../../services/error-handler/error-handler';
import { PromiseService } from '../../../../services/promise/promise.service';
import promiseModule from '../../../../services/promise/promise';
import anymindWebsocketModule from '../../../../services/anymind-websocket/anymind-websocket.service';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

(function(): void {
  function controller(
    PaymentsApi: PaymentsApi,
    FinancesApi: FinancesApi,
    errorHandler: ErrorHandlerService,
    promiseService: PromiseService,
    anymindWebsocket: AnymindWebsocketService,
  ): void {
    const loaderDelay = 500;
    this.isCard = false;
    this.isLoading = true;
    this.ngUnsubscribe$ = new Subject<void>();
    anymindWebsocket.financialOperation.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(data => {
      this.clientBalance = data.balanceAfter;
    });

    anymindWebsocket.clientCallCost.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(data => {
      this.clientBalance = data.balanceAfter;
    });

    this.$onDestroy = (): void => {
      this.ngUnsubscribe$.next();
      this.ngUnsubscribe$.complete();
    };

    PaymentsApi.getCreditCardsRoute().then(response => {
      if (response && response.length > 0) {
        this.isCard = true;
        this.isLoading = false;
      } else {
        promiseService
          .setMinimalDelay(FinancesApi.getClientBalanceRoute(), loaderDelay)
          .then(value => {
            this.clientBalance = value;
            this.isLoading = false;
          })
          .catch(error => {
            errorHandler.handleServerError(error);
            this.isLoading = false;
          });
      }
    });
    return this;
  }

  const component = {
    template: require('./navigation.html'),
    controller: ['PaymentsApi', 'FinancesApi', 'errorHandler', 'promiseService', 'anymindWebsocket', controller],
    controllerAs: '$ctrl',
    bindings: {},
  };

  angular
    .module('profitelo.components.dashboard.client.navigation', [
      'pascalprecht.translate',
      userModule,
      apiModule,
      filtersModule,
      promiseModule,
      errorHandlerModule,
      anymindWebsocketModule,
    ])
    .component('clientNavigation', component);
})();
