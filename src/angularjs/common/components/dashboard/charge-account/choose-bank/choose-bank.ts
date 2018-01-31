import * as angular from 'angular';
import { ChooseBankComponent } from './choose-bank.component';

const chooseBankModule = angular.module('profitelo.components.dashboard.charge-account.choose-bank', [
])
  .component('chooseBank', new ChooseBankComponent())
    .name;

export default chooseBankModule;
