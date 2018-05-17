import { IExpertNavigationComponentBindings } from './navigation';
import { FinancesApi } from 'profitelo-api-ng/api/api';
import { MoneyDto } from 'profitelo-api-ng/model/models';
import { ErrorHandlerService } from '../../../../services/error-handler/error-handler.service';
import { PromiseService } from '../../../../services/promise/promise.service';
import { ProfiteloWebsocketService } from '../../../../services/profitelo-websocket/profitelo-websocket.service';
import { UserService } from '../../../../services/user/user.service';
import { Config } from '../../../../../../config';

// tslint:disable:member-ordering
export class ExpertNavigationComponentController implements IExpertNavigationComponentBindings {

  private static readonly loaderDelay = 500;
  public expertBalance: MoneyDto;
  public isLoading = true;
  public isPlatformForExpert = Config.isPlatformForExpert;
  public isCompany = true;

  public static $inject = ['FinancesApi', 'userService', 'errorHandler', 'promiseService', 'profiteloWebsocket'];

    constructor(FinancesApi: FinancesApi,
              userService: UserService,
              errorHandler: ErrorHandlerService,
              promiseService: PromiseService,
              profiteloWebsocket: ProfiteloWebsocketService) {

    userService.getUser().then((account) => {
      this.isCompany = account.isCompany;
    });

    profiteloWebsocket.onProfileCallProfit((data) => {
      this.expertBalance = data.balanceAfter;
    });

    profiteloWebsocket.onProfileCallRefund((data) => {
      this.expertBalance = data.balanceAfter;
    });

    promiseService.setMinimalDelay(FinancesApi.getProfileBalanceRoute(),
      ExpertNavigationComponentController.loaderDelay).then((value) => {
      this.expertBalance = value;
      this.isLoading = false;
    }).catch((error) => {
      errorHandler.handleServerError(error);
      this.isLoading = false;
    });

  }
}
