import * as angular from 'angular';
import { MoneyDto } from 'profitelo-api-ng/model/models';

const handleAmount = (_amount: number): string => {
  let sign = '';
  const numeralSystem: number = 10;
  const dividerByHundred: number = 100;
  const dividerByTen: number = 10;
  const amount = parseInt(<any>_amount, numeralSystem);
  const major = (amount) ? amount / dividerByHundred | 0 : 0;
  const minor = (amount) ? amount % dividerByHundred : 0;
  const minorFirst = (minor) ? minor % dividerByTen : 0;
  const minorSecond = (minor) ? minor / dividerByTen | 0 : 0;

  if (_amount < 0) {
    sign = '-';
  }

  return `${sign + String(Math.abs(major))}.${Math.abs(minorSecond)}${Math.abs(minorFirst)}`;
};

const handleMoney = (_money: MoneyDto): string =>
  '<span class="amount">' + handleAmount(_money.amount) + '</span>' +
    '<span class="currency">' + _money.currency + '</span>';

function filter(): (money: MoneyDto) => string {
  return function (money: MoneyDto): string {

    if (!money || typeof money !== 'object' || !money.hasOwnProperty('amount') || !money.hasOwnProperty('currency')) {
      return '';
    }

    return handleMoney(money);
  };
}

angular.module('profitelo.filters.money', [])
  .filter('money', [filter]);
