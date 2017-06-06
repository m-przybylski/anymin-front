import * as angular from 'angular'
import singleConsultationEditModule from './single-consultation-edit'
import {SingleConsultationEditComponentController} from './single-consultation-edit.controller'

describe('Unit testing: profitelo.components.wizard.single-consultation-edit', () => {
  return describe('for single-consultation-edit component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: SingleConsultationEditComponentController

    beforeEach(() => {
      angular.mock.module(singleConsultationEditModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope.$new()
        compile = $compile


        component = $componentController<SingleConsultationEditComponentController, {}>('singleConsultationEdit', {}, {
        })

      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

  })
})
