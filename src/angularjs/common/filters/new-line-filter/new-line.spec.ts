import * as angular from 'angular'
import {IFilterService} from "../../services/filter/filter.service";

describe('Unit testing: profitelo.filters.new-line', () => {
  describe('for newLineFilter >', () => {

    let $filter: IFilterService
    let $sce: ng.ISCEService

    beforeEach(() => {
      angular.mock.module('profitelo.filters.new-line')
    })

    beforeEach(inject((_$filter_: IFilterService, _$sce_: ng.ISCEService) => {
      $filter = _$filter_
      $sce = _$sce_
    }))

    it('should getTrustedHtml', () => {
      const content = 'Ala ma kota \n nie tylko'
      const text = $filter('newLineFilter')(content)
      expect($sce.getTrustedHtml(text)).toEqual('Ala ma kota <br> nie tylko')
    })
  })
})
