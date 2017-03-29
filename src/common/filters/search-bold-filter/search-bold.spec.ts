import {IFilterService} from '../../services/filter/filter.service'
import * as angular from 'angular'

describe('Unit testing: profitelo.filters.search-bold-filter >', () => {
  describe('for profitelo.filters.search-bold-filter >', () => {

    let $filter: IFilterService

    beforeEach(() => {
      angular.mock.module('profitelo.filters.search-bold-filter')
    })

    beforeEach(inject((_$filter_: IFilterService) => {
      $filter = _$filter_
    }))

    it('should return bold part of string in strong tag', () => {

      const string = 'abcdefghijk'
      expect($filter('searchBoldFilter')(string, 'def')).toEqual('abc<strong>def</strong>ghijk')
    })

  })
})
