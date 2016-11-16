describe('Unit testing: profitelo.filters.money >', () => {
  describe('for profitelo.filters.money >', () => {

    let $filter

    beforeEach(() => {
      module('profitelo.filters.money')
    })

    beforeEach(inject((_$filter_) => {
      $filter = _$filter_
    }))

    it('should return amount with currency', () => {

      const moneyObj = {
        amount: 1000,
        currency: 'PLN'
      }

      expect($filter('money')(moneyObj)).toBe('10.00 PLN')
    })

  })
})