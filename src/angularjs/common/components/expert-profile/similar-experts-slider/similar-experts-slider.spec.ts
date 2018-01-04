namespace profitelo.components.expertProfile.similarExpertsSlider {

  describe('Unit testing: profitelo.components.expert-profile.similar-experts-slider', () => {
    return describe('for similarExpertsSlider component >', () => {

      let scope: any
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      let $state: ng.ui.IStateService
      let bindings: any
      const validHTML = '<similar-experts-slider consultations="[{name: null}]"></similar-experts-slider>'
      let el: any

      function create(html: string): JQuery {
        scope = rootScope.$new()
        const elem = angular.element(html)
        const compiledElement = compile(elem)(scope)
        scope.$apply()
        return compiledElement
      }

      beforeEach(() => {

        angular.mock.module('profitelo.components.expert-profile.similar-experts-slider')
        angular.mock.module('ui.router')
        angular.mock.module('profitelo.components.interface.slider')

        inject(($rootScope: any, $compile: ng.ICompileService,
                _$componentController_: ng.IComponentControllerService, _$state_: ng.ui.IStateService) => {
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
          $state = _$state_
        })

        bindings = {
          consultations: [
            {value: 1},
            {value: 1},
            {value: 1}
          ]
        }

        const injectors = {
          $element: el,
          $scope: rootScope,
          $state: $state
        }

        component = componentController('similarExpertsSlider', injectors, bindings)
        component.$onInit()
      })

      it('should have a dummy test', () => {
        expect(true).toBeTruthy()
      })

      it('should compile the component', () => {
        el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })

      it('should go to next-slide', () => {
        const $scope: any = rootScope
        $scope.controlls = {
          nextSlide: (): number => {
            return 1011
          }
        }

        spyOn($scope.controlls, 'nextSlide')
        component.nextSlide()
        expect($scope.controlls.nextSlide).toHaveBeenCalled()
      })

      it('should go to prev-slide', () => {
        const $scope: any = rootScope
        $scope.controlls = {
          prevSlide: (): number => {
            return 1011
          }
        }

        spyOn($scope.controlls, 'prevSlide')
        component.prevSlide()
        expect($scope.controlls.prevSlide).toHaveBeenCalled()
      })

      it('should go to profile', () => {
        spyOn($state, 'go')
        const consultation = {
          id: '55',
          owner: {
            id: '123',
            type: 'ORG'
          }
        }
        component.goToProfile(consultation)
        expect($state.go).toHaveBeenCalledWith('app.company-profile', {
          profileId: consultation.owner.id,
          primaryConsultationId: consultation.id
        })
      })

    })
  })
}
