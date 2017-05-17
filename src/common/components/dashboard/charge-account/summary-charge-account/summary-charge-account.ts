import * as angular from 'angular'
import {MoneyDto} from 'profitelo-api-ng/model/models'

import filtersModule from '../../../../filters/filters'

  export interface ISummaryChargeAccountComponentBindings {
    amount: MoneyDto
  }

  export class SummaryChargeAccountComponentController implements ng.IController, ISummaryChargeAccountComponentBindings {

    public amount: MoneyDto
    /* @ngInject */
    constructor() {

    }

  }

  class SummaryChargeAccountComponent implements ng.IComponentOptions {
    template = require('./summary-charge-account.pug')()
    controller: ng.Injectable<ng.IControllerConstructor> = SummaryChargeAccountComponentController
    replace: true
    controllerAs: '$ctrl'
    bindings: {[boundProperty: string]: string} = {
      amount: '<',
      btnTitle: '@'
    }
  }

  angular.module('profitelo.components.dashboard.charge-account.summary-charge-account', [
    'pascalprecht.translate',
    filtersModule
  ])
  .component('summaryChargeAccount', new SummaryChargeAccountComponent())
