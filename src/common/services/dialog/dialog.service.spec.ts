import * as angular from "angular"
import {DialogService} from "./dialog.service"

describe('Unit testing: profitelo.services.dialog >', () => {
  describe('for profitelo.services.dialog >', () => {

    let dialogService: DialogService

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.services.dialog')
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      dialogService = $injector.get<DialogService>('dialogService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should open uidModal', inject(($uibModal: ng.ui.bootstrap.IModalService) => {

      spyOn($uibModal, 'open')

      dialogService.openDialog()

      expect($uibModal.open).toHaveBeenCalled()
    }))
  })
})
