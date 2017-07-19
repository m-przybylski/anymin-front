import {IExpertNavigationComponentBindings} from './navigation'
import {FinancesApi} from 'profitelo-api-ng/api/api'
import {MoneyDto} from 'profitelo-api-ng/model/models'
import {ErrorHandlerService} from '../../../../services/error-handler/error-handler.service'
import {PromiseService} from '../../../../services/promise/promise.service'
export class ExpertNavigationComponentController implements IExpertNavigationComponentBindings {

  public static readonly loaderDelay: number = 500
  public clientBalance: MoneyDto
  public isLoading: boolean = true

  /* @ngInject */
  constructor(FinancesApi: FinancesApi,
              errorHandler: ErrorHandlerService,
              promiseService: PromiseService) {

    promiseService.setMinimalDelay(FinancesApi.getClientBalanceRoute(),
      ExpertNavigationComponentController.loaderDelay).then((value) => {
      this.clientBalance = value
      this.isLoading = false
    }).catch((error) => {
      errorHandler.handleServerError(error)
      this.isLoading = false
    })

  }
}
