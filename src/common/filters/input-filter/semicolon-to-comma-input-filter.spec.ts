import * as angular from "angular"
import {IFilterService} from "../../services/filter/filter.service"

describe('Unit testing: profitelo.filters.input-filter.semicolon-to-comma-input-filter>', () => {
  describe('for message >', () => {

    let $filter: IFilterService

    beforeEach(() => {
      angular.mock.module('profitelo.filters.input-filter.semicolon-to-comma-input-filter')
    })

    beforeEach(inject((_$filter_: IFilterService) => {
      $filter = _$filter_
    }))

    const input = "text,asd"

    it('should semicolonToCommaInputFilter', () => {
      expect($filter('semicolonToCommaInputFilter')(input)).toEqual("text.asd")
    })
  })
})
