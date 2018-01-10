import {IExpertNavigationComponentBindings} from './navigation'
import {FinancesApi} from 'profitelo-api-ng/api/api'
import {MoneyDto} from 'profitelo-api-ng/model/models'
import {ErrorHandlerService} from '../../../../services/error-handler/error-handler.service'
import {PromiseService} from '../../../../services/promise/promise.service'
import {ProfiteloWebsocketService} from '../../../../services/profitelo-websocket/profitelo-websocket.service'
import {UserService} from '../../../../services/user/user.service'
import {Config} from '../../../../../app/config';

export class ExpertNavigationComponentController implements IExpertNavigationComponentBindings {

  private static readonly loaderDelay: number = 500
  public expertBalance: MoneyDto
  public isLoading: boolean = true
  public isPlatformForExpert: boolean = Config.isPlatformForExpert
  public isCompany: boolean = true

    constructor(FinancesApi: FinancesApi,
              userService: UserService,
              errorHandler: ErrorHandlerService,
              promiseService: PromiseService,
              profiteloWebsocket: ProfiteloWebsocketService) {

    userService.getUser().then((account) => {
      this.isCompany = account.isCompany
    })

    profiteloWebsocket.onNewFinancialOperation((data) => {
      this.expertBalance = data.balanceAfter
    })

    profiteloWebsocket.onProfileCallProfit((data) => {
      this.expertBalance = data.balanceAfter
    })

    promiseService.setMinimalDelay(FinancesApi.getProfileBalanceRoute(),
      ExpertNavigationComponentController.loaderDelay).then((value) => {
      this.expertBalance = value
      this.isLoading = false
    }).catch((error) => {
      errorHandler.handleServerError(error)
      this.isLoading = false
    })

  }
}
