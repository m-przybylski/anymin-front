(function() {
  function filter() {
    return function(money) {
      let result = ''

      if (money && typeof money === 'object') {
        if (money.hasOwnProperty('amount')) {
          const amount = parseInt(money.amount, 10)
          const major = (amount) ? parseInt(amount/100, 10) : 0
          const minor = (amount) ? amount%100 : 0
          const minorFirst = (minor) ? minor%10 : 0
          const minorSecond = (minor) ? parseInt(minor/10, 10) : 0
          result += major + '.' + minorSecond + minorFirst
        }
        if (money.hasOwnProperty('currency')) {
          result += ' ' + money.currency
        }
      }

      return result
    }
  }

  angular.module('profitelo.filters.money', [])
    .filter('money', filter)
}())