import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {DialogService} from '../../../services/dialog/dialog.service'
import {IProExpertSlideScope} from './pro-expert-slider'

describe('Unit testing: profitelo.directives.expert-profile.pro-expert-slider', () => {
  return describe('for expert-profile.pro-expert-slider directive >', () => {

    let scope: IProExpertSlideScope
    let rootScope: ng.IRootScopeService
    let compile: any = null
    let timeout: ng.ITimeoutService
    let dialogService: DialogService
    const validHTML = '<pro-expert-slider data-sliders="sliders"></pro-expert-slider>'

    beforeEach(() => {

      angular.mock.module('profitelo.directives.expert-profile.pro-expert-slider')
      angular.mock.module('profitelo.services.dialog')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $timeout: ng.ITimeoutService,
              _dialogService_: DialogService) => {
        rootScope = $rootScope.$new()
        compile = $compile
        timeout = $timeout
        dialogService = _dialogService_
      })
    })

    function create(html: string): JQuery {
      scope = <IProExpertSlideScope>rootScope.$new()
      const elem = angular.element(html)
      scope.controlls = {
        nextSlide: (): void => {
        },
        prevSlide: (): void => {
        }
      }
      scope.sliders = [{previews: 'asd'}, {previews: 'asd'}, {previews: 'asd'}]

      const compiledElement = compile(elem)(scope)
      scope.$digest()
      timeout.flush()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should nextSlide', () => {
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProExpertSlideScope>()
      spyOn(isoScope.controlls, 'nextSlide')
      isoScope.nextSlide()
      expect(isoScope.controlls.nextSlide).toHaveBeenCalled()
    })

    it('should prevSlide', () => {
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProExpertSlideScope>()
      spyOn(isoScope.controlls, 'prevSlide')
      isoScope.prevSlide()
      expect(isoScope.controlls.prevSlide).toHaveBeenCalled()
    })

    it('should openDialog', () => {
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProExpertSlideScope>()
      const slide = {
        previews: 'slide'
      }
      spyOn(dialogService, 'openDialog')
      isoScope.openDialog(slide)
      expect(dialogService.openDialog).toHaveBeenCalled()
    })

  })
})
