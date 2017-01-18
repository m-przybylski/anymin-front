describe('Unit testing: profitelo.services.dialog >', () => {
  describe('for profitelo.services.dialog >', () => {

    let dialogService

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.services.dialog')
    })

    beforeEach(inject(($injector) => {
      dialogService = $injector.get('dialogService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should open uidModal', inject(($uibModal) => {

      spyOn($uibModal, 'open')

      dialogService.openDialog()

      expect($uibModal.open).toHaveBeenCalled()
    }))
  })
})
