describe('Unit testing: profitelo.filters.money >', () => {
  describe('for profitelo.filters.money >', () => {

    let $filter

    beforeEach(() => {
    angular.mock.module('profitelo.filters.money')
    })

    beforeEach(inject((_$filter_) => {
      $filter = _$filter_
    }))

    const getMoneyStringForAmountAndCurrency = (amount, currency) =>
      '<span class="amount">' + amount + '</span><span class="currency">' + currency + '</span>'

    it('should return 1034 amount with currency', () => {

      const moneyObj = {
        amount: 1034,
        currency: 'PLN'
      }

      expect($filter('money')(moneyObj)).toBe(getMoneyStringForAmountAndCurrency('10.34', moneyObj.currency))
    })

    it('should return minor -0.09', () => {

      const moneyObj = {
        amount: -9,
        currency: 'PLN'
      }

      expect($filter('money')(moneyObj)).toBe(getMoneyStringForAmountAndCurrency('-0.09', moneyObj.currency))
    })

    it('should return minor -0.17', () => {

      const moneyObj = {
        amount: -17,
        currency: 'PLN'
      }

      expect($filter('money')(moneyObj)).toBe(getMoneyStringForAmountAndCurrency('-0.17', moneyObj.currency))
    })

    it('should return minor 0.04', () => {

      const moneyObj = {
        amount: 4,
        currency: 'PLN'
      }

      expect($filter('money')(moneyObj)).toBe(getMoneyStringForAmountAndCurrency('0.04', moneyObj.currency))
    })

  })
})