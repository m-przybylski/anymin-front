describe('Unit testing: profitelo.filters.milliseconds-to-datetime>', () => {
  describe('for message >', () => {

    let $filter

    beforeEach(() => {
      angular.mock.module('profitelo.filters.milliseconds-to-datetime')
    })

    beforeEach(inject((_$filter_) => {
      $filter = _$filter_
    }))

    const milliseconds = 12
    const date = new Date(0, 0, 0, 0, 0 ,0 ,0)
    date.setMilliseconds(milliseconds)

    it('should millisecondsToDatetime', () => {
      expect($filter('millisecondsToDatetime')(milliseconds)).toEqual(date)
    })
  })
})