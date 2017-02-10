namespace profitelo.components.expertProfile.expertsConsultationSlider {
  import IUrlService = profitelo.services.helper.IUrlService
  describe('Unit testing: profitelo.components.expert-profile.experts-consultation-slider', () => {
    return describe('for expertsConsultationSlider >', () => {

      let scope: any
      let rootScope: any
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      let urlService: IUrlService
      let validHTML = '<experts-consultation-slider data-title="title" data-experts="[]"></experts-consultation-slider>'
      const bindings = {
        experts: [],
        title: 'title'
      }

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.components.expert-profile.experts-consultation-slider')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
                _$componentController_: ng.IComponentControllerService, _urlService_: IUrlService) => {
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
          urlService = _urlService_
        })

        component = componentController('expertsConsultationSlider', {$scope: rootScope}, bindings)

      })

      function create(html: string) {
        scope = rootScope.$new()
        let elem = angular.element(html)
        let compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the component', () => {
        let el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })

      it('should go to nextSlide', () => {
        rootScope.controlls = {
          nextSlide: () => {
          }
        }
        spyOn(rootScope.controlls, 'nextSlide')
        component.nextSlide()
        expect(rootScope.controlls.nextSlide).toHaveBeenCalled()
      })

      it('should go to prevSlide', () => {
        rootScope.controlls = {
          prevSlide: () => {
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
}
