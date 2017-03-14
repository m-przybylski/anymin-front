import * as angular from "angular"
import {CommonSettingsService} from "./common-settings.service"

describe('Unit testing: profitelo.services.commonSettings >', () => {
  describe('for CommonSettingsService service >', () => {

    let CommonSettingsService: CommonSettingsService

    beforeEach(() => {
      angular.mock.module('profitelo.services.commonSettings')

      inject(($injector: ng.auto.IInjectorService) => {
        CommonSettingsService = $injector.get<CommonSettingsService>('CommonSettingsService')
      })

    })

    it('should exist', () => {
      expect(true).toBeTruthy()
    })
  })
})
