namespace profitelo.components.dashboard.settings.modals.payments.editCompanyInvoice {

  describe('Testing Controller: EditCompanyInvoiceController', () => {

    let controller: EditCompanyInvoiceController
    let scope: IEditCompanyInvoiceControllerScope

    const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
      jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
    }))

    beforeEach(() => {
      angular.mock.module('ui.bootstrap')
      angular.mock.module('profitelo.components.dashboard.settings.modals.payments.edit-company-invoice')

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

        scope = <IEditCompanyInvoiceControllerScope>$rootScope.$new()
        const injectors = {
          $scope: scope,
          $uibModalInstance: $uibModalInstance
        }

        controller = $controller<EditCompanyInvoiceController>('editCompanyInvoiceController', injectors)
      })
    })

    it('should exists', () => {
      return expect(!!controller).toBe(true)
    })
  })
}
