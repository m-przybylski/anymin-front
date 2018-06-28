// tslint:disable:prefer-method-signature
import * as angular from 'angular';
import filtersModule from '../../../../filters/filters';
import inputModule from '../../../interface/input/input';
import { IAmounts, IAmountModel } from '../../../../../app/charge-account/modal/charge-account.controller';
import ValidationAlertModule from '../../../interface/alert/validation-alert/validation-alert';
import { ChooseAmountChargeComponent } from './choose-amount-charge.component';

export interface IChooseAmountChargeComponentBindings {
  title: string;
  amounts: IAmounts;
  amountModel: IAmountModel;
  scrollHandler: (slideTo?: number) => void;
  currentSection: number;
}

const chooseAmountChargeModule = angular.module('profitelo.components.dashboard.charge-account.choose-amount-charge', [
  'profitelo.services.commonSettings',
  'ngSanitize',
  filtersModule,
  ValidationAlertModule,
  inputModule
])
  .component('chooseAmountCharge', new ChooseAmountChargeComponent())
    .name;

export default chooseAmountChargeModule;
