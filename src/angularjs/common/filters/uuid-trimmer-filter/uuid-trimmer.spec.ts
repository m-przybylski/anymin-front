import * as angular from 'angular'
import {IFilterService} from '../../services/filter/filter.service'
import filtersModule from "../filters";

describe('Unit testing: profitelo.filters.uuid-trimmer-filter.uuid-trimmer >', () => {
  describe('for uuid filter >', () => {

    let $filter: IFilterService
    const filterName = 'uuidTrimmer'

    beforeEach(() => {
      angular.mock.module(filtersModule)
    })

    beforeEach(inject((_$filter_: IFilterService) => {
      $filter = _$filter_
    }))

    it('should trim defined uuid', () => {
      const testUUID = 'bc056578-2a53-473c-bd74-afa8af5e146d'
      const trimmedUUID = 'afa8af5e146d'

      expect($filter(filterName)(testUUID)).toEqual(trimmedUUID)
    })

    it('should not trim string that is not uuid', () => {
      const fakeString = "notValidUUID"

      expect($filter(filterName)(fakeString)).toEqual(fakeString)
    })

    it('should not trim undefined uuid', () => {
      const undefinedUUID: any = undefined

      expect($filter(filterName)(undefinedUUID)).toEqual('')
    })

  })
})
