import * as angular from "angular"
import {MoneyDto} from "../../api/model/MoneyDto"
const handleAmount = (_amount: number) => {
  let sign = ''
  const amount = parseInt(<any>_amount, 10)
  const major = (amount) ? amount / 100 | 0 : 0
  const minor = (amount) ? amount % 100 : 0
  let minorFirst = (minor) ? minor % 10 : 0
  let minorSecond = (minor) ? minor / 10 | 0 : 0

  if (_amount < 0) {
    sign = '-'
  }

  return sign + Math.abs(major) + '.' + Math.abs(minorSecond) + Math.abs(minorFirst)
}

const handleMoney = (_money: MoneyDto) => {
  return '<span class="amount">' + handleAmount(_money.amount) + '</span>' +
    '<span class="currency">' + _money.currency + '</span>'
}

function filter() {
  return function (money: MoneyDto) {

    if (!money || typeof money !== 'object' || !money.hasOwnProperty('amount') || !money.hasOwnProperty('currency')) {
      return ''
    }

    return handleMoney(money)
  }
}

angular.module('profitelo.filters.money', [])
  .filter('money', filter)
