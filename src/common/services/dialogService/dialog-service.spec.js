describe('Unit testing: profitelo.services.dialog-service >', () => {
  describe('for profitelo.services.dialog-service >', () => {

    let DialogService

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      module('profitelo.services.dialog-service')
    })

    beforeEach(inject(($injector) => {
      DialogService = $injector.get('DialogService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should open uidModal', inject(($uibModal) => {

      spyOn($uibModal, 'open')

      DialogService.openDialog()

      expect($uibModal.open).toHaveBeenCalled()
    }))
  })
})
