import * as angular from 'angular'
import './similar-consultations'
import {SimilarConsultationComponentController} from './similar-consultations.controller'
import similarConsultationModule from './similar-consultations'

describe('Unit testing: profitelo.components.interface.tiles', () => {
  return describe('for similarConsultation component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: SimilarConsultationComponentController

    const validHTML = '<similar-consultation data-title="Tekst" data-consultations="{}"></similar-consultation>'

    function create(html: string): JQuery {
      const parentScope: ng.IScope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentScope)
      parentScope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(similarConsultationModule)
    })

    beforeEach(() => {
      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          $element: create(validHTML)
        }

        const bindings = {
          consultations: {},
          title: 'Tekst'
        }

        component = $componentController<SimilarConsultationComponentController, {}>('similarConsultation', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const element: JQuery = create(validHTML)
      expect(element.html()).toBeDefined(true)
    })
  })
})
