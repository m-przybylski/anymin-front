// tslint:disable:readonly-array
// tslint:disable:no-shadowed-variable
import { IExpertNavigationComponentBindings } from './navigation';
import { FinancesApi } from 'profitelo-api-ng/api/api';
import { MoneyDto } from 'profitelo-api-ng/model/models';
import { ErrorHandlerService } from '../../../../services/error-handler/error-handler.service';
import { PromiseService } from '../../../../services/promise/promise.service';
import { UserService } from '../../../../services/user/user.service';
import { Config } from '../../../../../../config';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';

// tslint:disable:member-ordering
export class ExpertNavigationComponentController implements IExpertNavigationComponentBindings {
  private static readonly loaderDelay = 500;
  public expertBalance: MoneyDto;
  public isLoading = true;
  public isPlatformForExpert = Config.isPlatformForExpert;
  public isCompany = true;

  public static $inject = ['FinancesApi', 'userService', 'errorHandler', 'promiseService', 'anymindWebsocket'];

  constructor(
    FinancesApi: FinancesApi,
    userService: UserService,
    errorHandler: ErrorHandlerService,
    promiseService: PromiseService,
    anymindWebsocket: AnymindWebsocketService,
  ) {
    userService.getUser().then(account => {
      this.isCompany = account.isCompany;
    });

    anymindWebsocket.profileCallProfit.subscribe(data => {
      this.expertBalance = data.balanceAfter;
    });

    anymindWebsocket.profileCallRefund.subscribe(data => {
      this.expertBalance = data.balanceAfter;
    });

    promiseService
      .setMinimalDelay(FinancesApi.getProfileBalanceRoute1(), ExpertNavigationComponentController.loaderDelay)
      .then(value => {
        this.expertBalance = value.balance;
        this.isLoading = false;
      })
      .catch(error => {
        errorHandler.handleServerError(error);
        this.isLoading = false;
      });
  }
}
