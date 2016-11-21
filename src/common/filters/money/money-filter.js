(function() {

  const handleAmount = (_amount) => {
    const amount = parseInt(_amount, 10)
    const major = (amount) ? parseInt(amount / 100, 10) : 0
    const minor = (amount) ? amount % 100 : 0
    const minorFirst = (minor) ? minor % 10 : 0
    const minorSecond = (minor) ? parseInt(minor / 10, 10) : 0
    return major + '.' + minorSecond + minorFirst
  }

  const handleMoney = (_money) => {
    return handleAmount(_money.amount) + ' ' + _money.currency
  }

  function filter($log) {
    return function(money) {

      if (!money || typeof money !== 'object' || !money.hasOwnProperty('amount') || !money.hasOwnProperty('currency')) {
        $log.error('Money filter argument is not a money object')
        return ''
      }

      return handleMoney(money)
    }
  }

  angular.module('profitelo.filters.money', [])
    .filter('money', filter)
}())