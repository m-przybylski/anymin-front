describe('Unit testing: profitelo.filters.rankSearch >', () => {
  describe('for profitelo.filters.rankSearch >', () => {

    let $filter

    beforeEach(() => {
      module('profitelo.filters.rankSearch')
    })

    beforeEach(inject((_$filter_) => {
      $filter = _$filter_
    }))

    it('should return sorted results', () => {

      const arr = [
        {val: 'abcdefgh'},
        {val: 'abcdef'},
        {val: 'bcdefgh'},
        {val: 'cdefgh'}
      ]

      const searchKey = 'cdef'
      const props = ['val']

      const assertTo = [
        { val: 'abcdefgh', rankSearch: 16 },
        { val: 'abcdef', rankSearch: 16 },
        { val: 'bcdefgh', rankSearch: 8 },
        { val: 'cdefgh', rankSearch: 0 }
      ]

      expect($filter('rankSearch')(arr, searchKey, props)).toEqual(assertTo)
    })

  })
})