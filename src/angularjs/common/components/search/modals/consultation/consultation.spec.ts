import * as angular from 'angular'
import {
  IConsultationModalControllerScope,
  ConsultationModalController
} from './consultation.controller'
import consultationModalModule from './consultation'

describe('Testing Controller: consultationModalModule', () => {

  let consultationModalController: ConsultationModalController
  let scope: IConsultationModalControllerScope

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  beforeEach(() => {
    angular.mock.module(consultationModalModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
  }))

  beforeEach(() => {
    inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) => {

      scope = <IConsultationModalControllerScope>$rootScope.$new()

      const injectors = {
        $scope: scope,
        $uibModalInstance: $uibModalInstance
      }

      consultationModalController = $controller<ConsultationModalController>(
        'consultationModalController', injectors)
    })
  })

  it('should exists', () => expect(!!consultationModalController).toBe(true))

})
