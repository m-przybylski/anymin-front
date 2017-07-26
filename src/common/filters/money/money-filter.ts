import * as angular from 'angular'
import {MoneyDto} from 'profitelo-api-ng/model/models'

const handleAmount = (_amount: number): string => {
  let sign = ''
  const amount = parseInt(<any>_amount, 10)
  const major = (amount) ? amount / 100 | 0 : 0
  const minor = (amount) ? amount % 100 : 0
  const minorFirst = (minor) ? minor % 10 : 0
  const minorSecond = (minor) ? minor / 10 | 0 : 0

  if (_amount < 0) {
    sign = '-'
  }

  return sign + Math.abs(major) + '.' + Math.abs(minorSecond) + Math.abs(minorFirst)
}

const handleMoney = (_money: MoneyDto): string => {
  return '<span class="amount">' + handleAmount(_money.amount) + '</span>' +
    '<span class="currency">' + _money.currency + '</span>'
}

function filter(): (money: MoneyDto) => string {
  return function (money: MoneyDto): string {

    if (!money || typeof money !== 'object' || !money.hasOwnProperty('amount') || !money.hasOwnProperty('currency')) {
      return ''
    }

    return handleMoney(money)
  }
}

angular.module('profitelo.filters.money', [])
  .filter('money', filter)
