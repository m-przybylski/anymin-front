describe('Testing Controller: proComplaintsReportModalController', () => {

  var proComplaintsReportModalController
  var scope
  var _state
  var uibModalInstance = {
    dismiss: () => {

    }
  }

  beforeEach(() => {
    module('templates-module')
    module('profitelo.components.communicator.modals.pro-complaints-report-modal-controller')
    inject(($rootScope, $controller, _$state_) => {

      scope = $rootScope.$new()
      _state = _$state_
      proComplaintsReportModalController = $controller('proComplaintsReportModalController', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance,
        '$state': _state
      })

    })
  })

  it('should exists', () => {
    return expect(!!proComplaintsReportModalController).toBe(true)
  })

})
