import * as angular from 'angular'
import {ActiveCallBarComponentController} from './active-call-bar.controller'
import {ActiveCallBarService} from './active-call-bar.service'
import activeCallBarModule from './active-call-bar'

describe('Unit testing: profitelo.components.active-call-bar', () => {
  describe('for active call bar component >', () => {

    let component: ActiveCallBarComponentController
    const activeCallBarService: ActiveCallBarService =
      jasmine.createSpyObj<ActiveCallBarService>('activeCallBarService',
        ['pullCall', 'onShowCallBar', 'onHideCallBar'])

    beforeEach(() => {
      angular.mock.module(activeCallBarModule)

      inject(($componentController: ng.IComponentControllerService) => {
        const injectors = {
          activeCallBarService
        }
        component = $componentController<ActiveCallBarComponentController, {}>('activeCallBar', injectors, {})
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
