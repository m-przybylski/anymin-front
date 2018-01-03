import * as angular from 'angular'
import {PrintService} from './print.service'

describe('Unit testing: profitelo.services.print >', () => {
  describe('for profitelo.services.print >', () => {

    let printService: PrintService

    beforeEach(() => {
      angular.mock.module('profitelo.services.print')
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      printService = $injector.get<PrintService>('printService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

  })
})
