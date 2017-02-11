namespace profitelo.services.dialog {
describe('Unit testing: profitelo.services.dialog >', () => {
  describe('for profitelo.services.dialog >', () => {

    let dialogService: IDialogService

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.services.dialog')
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      dialogService = $injector.get<IDialogService>('dialogService')
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
}
