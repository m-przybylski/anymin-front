import * as angular from 'angular'
import {StateService} from '@uirouter/angularjs'
import {UrlService} from '../../../../../../services/url/url.service'

describe('Unit testing: profitelo.components.dashboard.client.favourites.favourite-experts.last-consultation-slider',
  () => {
    return describe('for lastConsultationSlider >', () => {

      let scope: any
      let rootScope: any
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      let urlService: UrlService
      const validHTML = '<last-consultation-slider data-title="title" data-consultations="[{}]"></last-consultation-slider>'
      let state: StateService

      function create(html: string): JQuery {
        scope = rootScope.$new()
        const elem = angular.element(html)
        const compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      const bindings = {
        consultations: {
          service: {
            id: '55'
          },
          profile: {
            id: '123'
          }
        },
        title: 'tekst'
      }

      beforeEach(() => {

        angular.mock.module('profitelo.components.interface.slider')
        angular.mock.module('profitelo.services.url')
        angular.mock.module('profitelo.filters.money')
        angular.mock.module('ui.router')
        angular.mock.module('profitelo.components.dashboard.client.favourites.favourite-experts.last-consultation-slider')

        inject(($rootScope: any, $compile: ng.ICompileService,
                _$componentController_: ng.IComponentControllerService, _$state_: StateService,
                _urlService_: UrlService) => {
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
          urlService = _urlService_
          state = _$state_

        })

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope,
          $state: state
        }

        component = componentController('lastConsultationSlider', injectors, bindings)
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the directive', () => {
        const el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })

      it('should go to nextslide', () => {
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

      it('should consultationOwnerImage', () => {
        spyOn(urlService, 'resolveFileUrl')
        component.consultationOwnerImage('asd')
        expect(urlService.resolveFileUrl).toHaveBeenCalled()
      })

      it('should go to urlService', () => {
        spyOn(urlService, 'resolveFileUrl')
        component.consultationOwnerImage('a')
        expect(urlService.resolveFileUrl).toHaveBeenCalled()
      })

      it('should goToProfile', inject(() => {
        spyOn(state, 'go')
        const consultation = {
          service: {
            id: '55'
          },
          profile: {
            id: '123'
          }
        }
        component.goToProfile(consultation)
        expect(state.go).toHaveBeenCalledWith('app.expert-profile', Object({
          profileId: consultation.profile.id,
          primaryConsultationId: consultation.service.id
        }))

      }))
    })
  })
