import * as angular from 'angular'

import {UrlService} from '../../../services/url/url.service'

describe('Unit testing: profitelo.components.expert-profile.experts-consultation-slider', () => {
  return describe('for expertsConsultationSlider >', () => {

    let scope: any
    let rootScope: any
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let urlService: UrlService
    const validHTML = '<experts-consultation-slider data-title="title" data-experts="[]"></experts-consultation-slider>'
    const bindings = {
      experts: [],
      title: 'title'
    }

    beforeEach(() => {

      angular.mock.module('profitelo.components.expert-profile.experts-consultation-slider')

      inject(($rootScope: any, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _urlService_: UrlService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        urlService = _urlService_
      })

      component = componentController('expertsConsultationSlider', {$scope: rootScope}, bindings)

    })

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should go to nextSlide', () => {
      rootScope.controlls = {
        nextSlide: (): void => {
        }
      }
      spyOn(rootScope.controlls, 'nextSlide')
      component.nextSlide()
      expect(rootScope.controlls.nextSlide).toHaveBeenCalled()
    })

    it('should go to prevSlide', () => {
      rootScope.controlls = {
        prevSlide: (): void => {
        }
      }
      spyOn(rootScope.controlls, 'prevSlide')
      component.prevSlide()
      expect(rootScope.controlls.prevSlide).toHaveBeenCalled()
    })

    it('should expertImage', inject(() => {
      spyOn(urlService, 'resolveFileUrl')
      component.expertImage('a')
      expect(urlService.resolveFileUrl).toHaveBeenCalled()
    }))
  })
})
