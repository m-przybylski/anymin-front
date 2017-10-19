import * as angular from 'angular'
import {IFilterService} from '../../services/filter/filter.service'

describe('Unit testing: profitelo.filters.uuid-trimmer-filter.uuid-trimmer>', () => {
  describe('for message >', () => {

    let $filter: IFilterService

    beforeEach(() => {
      angular.mock.module('profitelo.filters.uuid-trimmer-filter.uuid-trimmer')
    })

    beforeEach(inject((_$filter_: IFilterService) => {
      $filter = _$filter_
    }))

    const filterName = 'uuidTrimmer'

    it('should trim defined uuid', () => {
      const testUUID: string = 'bc056578-2a53-473c-bd74-afa8af5e146d'
      const trimmedUUID: string = 'afa8af5e146d'

      expect($filter(filterName)(testUUID)).toEqual(trimmedUUID)
    })

    it('should not trim string that is not uuid', () => {
      const fakeString: string = "notValidUUID"

      expect($filter(filterName)(fakeString)).toEqual(fakeString)
    })

    it('should not trim undefined uuid', () => {
      const undefinedUUID: any = undefined

      expect($filter(filterName)(undefinedUUID)).toEqual(undefinedUUID)
    })

  })
})
