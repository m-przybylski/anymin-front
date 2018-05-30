import * as angular from 'angular';
import { PaymentsApi, FinancesApi } from 'profitelo-api-ng/api/api';
import { GetProfile, GetService, MoneyDto } from 'profitelo-api-ng/model/models';
import { IPrimaryDropdownListElement } from '../../../interface/dropdown-primary/dropdown-primary';
import { TopAlertService } from '../../../../services/top-alert/top-alert.service';
import { ModalsService } from '../../../../services/modals/modals.service';
import { ErrorHandlerService } from '../../../../services/error-handler/error-handler.service';
import { TranslatorService } from '../../../../services/translator/translator.service';
import { StateService } from '@uirouter/angularjs';
import { CommonConfig } from '../../../../../../common-config';

export interface IPrecallModalControllerScope extends ng.IScope {
  service: GetService;
  owner: GetProfile;
  stream: MediaStream;
}

// tslint:disable:member-ordering
export class PrecallModalController implements ng.IController {
  public isLoading = true;
  public callLimitModel = '0';
  public paymentMethods: IPrimaryDropdownListElement[] = [];
  public clientBalance: IPrimaryDropdownListElement;
  public onSelectMain: IPrimaryDropdownListElement;
  public isPrepaid = true;
  public expertAvatar: string;
  public prepaidTranslation: string;
  public dateTimeLimit: string;
  public isRegExpPriceInputValid = true;
  public isPriceInputValid = true;
  public isInputValueGreaterThanAccountBalance = true;
  public serviceName = '';
  public servicePrice: MoneyDto;
  public serviceOwnerName = '';
  public isUnlimitedPrepaid = true;
  public isButtonProgress = false;
  public isBalanceEnoughForMinimalCallTime = false;
  public mediaStream?: MediaStream;
  private prepaidCallLimitModel: number;
  private prepaidValue: string;
  private moneyDivider = CommonConfig.getCommonConfig().config.moneyDivider;
  private consultationPrice: number;

  public onModalClose = (): void => {
    this.closeMediaStream();
    this.$uibModalInstance.dismiss('cancel');
  }

  private service: GetService;
  private serviceOwner: GetProfile;
  private readonly moneyNumberOfDecimalPlaces = 2;
  private readonly secondPerMinute = 60;
  private readonly minPrepaidMinutesTimeLimitToCall = 2;

  public static $inject = ['$log', '$uibModalInstance', 'FinancesApi', 'PaymentsApi', 'topAlertService',
    'translatorService', '$state', 'modalsService', 'errorHandler', '$scope'];

  constructor(private $log: ng.ILogService,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private FinancesApi: FinancesApi,
              private PaymentsApi: PaymentsApi,
              private topAlertService: TopAlertService,
              private translatorService: TranslatorService,
              private $state: StateService,
              private modalsService: ModalsService,
              private errorHandler: ErrorHandlerService,
              private $scope: IPrecallModalControllerScope) {
  }

  public $onInit = (): void => {
    this.prepaidValue = this.translatorService.translate('COMMUNICATOR.MODALS.PRECALL.PREPAID.READONLY.VALUE');
    this.prepaidTranslation = this.translatorService.translate('COMMUNICATOR.MODALS.PRECALL.PREPAID.LABEL');
    this.dateTimeLimit = this.translatorService.translate('COMMUNICATOR.MODALS.PRECALL.LIMIT.NONE');

    this.service = this.$scope.service;
    this.serviceOwner = this.$scope.owner;
    this.mediaStream = this.$scope.stream;

    if (this.service) {
      this.consultationPrice = this.service.price.amount / this.moneyDivider;
      this.serviceName = this.service.name;
      this.servicePrice = this.service.price;
    }

    if (this.serviceOwner && this.serviceOwner.organizationDetails) {
      this.expertAvatar = this.serviceOwner.organizationDetails.logo;
      this.serviceOwnerName = this.serviceOwner.organizationDetails.name;
    }
    else if (this.serviceOwner && this.serviceOwner.expertDetails) {
      this.serviceOwnerName = this.serviceOwner.expertDetails.name;
      this.expertAvatar = this.serviceOwner.expertDetails.avatar;
    }

    this.$scope.$on('modal.closing', () => {
      this.closeMediaStream();
    });

    this.PaymentsGetCreditCardsRoute();
    this.FinanceGetClientBalanceRoute();
  }

  private closeMediaStream = (): void => {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(t => {
        t.enabled = false;
      });
      this.mediaStream.getTracks().forEach(t => {
        t.stop();
      });
    }
  }

  private PaymentsGetCreditCardsRoute = (): void => {
    this.PaymentsApi.getCreditCardsRoute().then((paymentMethods) => {
      this.isLoading = false;
      this.paymentMethods = paymentMethods.map((el) => ({
        name: /*el.cardType + ': ' + */el.maskedNumber,
        value: el.cardAuth
      }));
      this.paymentMethods.push(this.clientBalance);
    }, (error) => {
      this.$log.error(error);
      this.topAlertService.error({
        message: this.translatorService.translate('COMMUNICATOR.MODALS.PRECALL.ERROR.NO_RESPONSE'),
        timeout: 2
      });
      this.$uibModalInstance.dismiss('cancel');
    });
  }

  private FinanceGetClientBalanceRoute = (): void => {
    this.FinancesApi.getClientBalanceRoute().then((clientBalance) => {
      this.prepaidCallLimitModel = clientBalance.amount;
      this.clientBalance = {
        name: this.prepaidTranslation + ' '
        + (clientBalance.amount / this.moneyDivider).toFixed(this.moneyNumberOfDecimalPlaces) + ' '
        + clientBalance.currency,
        value: this.prepaidValue
      };
      this.isBalanceEnoughForMinimalCallTime = this.checkIsBalanceEnoughForMinimalCallTime();
      this.onSelectMain = this.clientBalance;

    }, (error) => {
      this.$log.error(error);
      this.topAlertService.error({
        message: this.translatorService.translate('COMMUNICATOR.MODALS.PRECALL.ERROR.NO_RESPONSE'),
        timeout: 2
      });
      this.onModalClose();
    });
  }

  // tslint:disable-next-line:cyclomatic-complexity
  public startCall = (): void => {
    if (!this.isPrepaid && this.isRegExpPriceInputValid
      && this.isPriceInputValid
      && this.isInputValueGreaterThanAccountBalance
      && this.prepaidCallLimitModel !== 0 || this.isPrepaid
      && this.isBalanceEnoughForMinimalCallTime) {
      this.isButtonProgress = true;
      alert('Sorry, not implemented');
    }
  }

  public addNewPaymentMethod = (): void => {
    this.modalsService.createAddPaymentMethodControllerModal(this.onModalClose);
    this.onModalClose();
  }

  public showChargeAccountModal = (): void => {
    this.$state.go('app.charge-account');
    this.onModalClose();
  }

  public isRegexpPriceValid = (isValid: boolean): void => {
    this.isRegExpPriceInputValid = isValid;
  }

  public onPriceChange = (consultationCostModel: string): void => {
    const amount = Number(consultationCostModel.toString().replace(',', '.'));
    this.changeAmountPerTimeCall(amount);
    this.isInputValueGreaterThanAccountBalance = this.isValueGreaterThanAccountBalanceValid(amount);
    this.isPriceInputValid = this.isPriceValid(amount);
  }

  private changeAmountPerTimeCall = (inputValue: number): void => {
    const date: Date = new Date(0);
    const miliSeconds = Math.round(date.setSeconds(inputValue / this.consultationPrice * this.secondPerMinute));

    if (inputValue !== 0) {
      this.isUnlimitedPrepaid = false;
      this.dateTimeLimit = miliSeconds.toString();
    }
    else {
      this.isUnlimitedPrepaid = true;
      this.dateTimeLimit = this.translatorService.translate('COMMUNICATOR.MODALS.PRECALL.LIMIT.NONE');
    }
  }

  public onSelectItemDropdown = (data: IPrimaryDropdownListElement): void => {
    this.callLimitModel = '0';
    this.onPriceChange(this.callLimitModel);
    this.dateTimeLimit = this.translatorService.translate('COMMUNICATOR.MODALS.PRECALL.LIMIT.NONE');
    this.isPrepaid = data.value === this.prepaidValue;
    const token = this.isPrepaid ? undefined : data.value;
    this.PaymentsApi.putDefaultPaymentMethodRoute({cardAuth: token}).then(() => {
      // TODO Wait for: https://git.contactis.pl/itelo/profitelo/issues/1015
      const input = angular.element('input-price input')[0];
      if (input) {
        input.focus();
      } else {
        this.$log.error('Can not find input HTML element');
      }
    }, (error: any) => {
      this.errorHandler.handleServerError(error,
        'Can not change default payment method',
        'COMMUNICATOR.MODALS.PRECALL.ERROR.DEFAULT_PAYMENT');
    });
  }

  private isValueGreaterThanAccountBalanceValid = (model: number): boolean =>
    this.isPrepaid ? this.isValueGraterThanAccountBalance(model) : model >= 0

  private isPriceValid = (model: number): boolean =>
    this.isPrepaid ? this.isPriceEnoughtForMinimalCallTime(model) || model === 0 : true

  private isPriceEnoughtForMinimalCallTime = (model: number): boolean =>
    (model / this.consultationPrice) >= this.minPrepaidMinutesTimeLimitToCall || model === 0

  private isValueGraterThanAccountBalance = (model: number): boolean =>
    ((model <= this.prepaidCallLimitModel / this.moneyDivider)) || model === 0

  private checkIsBalanceEnoughForMinimalCallTime = (): boolean =>
    (this.prepaidCallLimitModel / this.moneyDivider > this.consultationPrice)
}
