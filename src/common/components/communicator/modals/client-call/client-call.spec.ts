describe('Testing Controller: clientCallController', () => {

  let clientCallController
  let scope
  let uibModalInstance = {
    dismiss: _ => _,
    close: _ => _
  }
  let parent = {
    rejectCall: _ => _,
    answerCall: _ => _
  }

  beforeEach(() => {
  angular.mock.module('profitelo.components.communicator.modals.client-call')
    inject(($rootScope, $controller) => {

      scope = $rootScope.$new()
      scope.$parent = parent

      const injectors = {
        $scope: scope,
        $uibModalInstance: uibModalInstance
      }

      clientCallController = $controller('clientCallController', injectors)
    })
  })
 
  it('should exists', () => {
    return expect(!!clientCallController).toBe(true)
  })

  it('should have rejectCall function', () => {

    spyOn(uibModalInstance, 'dismiss')
    spyOn(scope.$parent, 'rejectCall')

    scope.rejectCall()

    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('reject')
    expect(scope.$parent.rejectCall).toHaveBeenCalled()
  })
})
