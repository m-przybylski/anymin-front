describe('Unit testing: profitelo.components.expert-profile.similar-experts-slider', () => {
  return describe('for similarExpertsSlider component >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let $state
    let bindings
    let similarExpertsSlider
    let validHTML = '<similar-experts-slider consultations="[{name: null}]"></similar-experts-slider>'
    let el
    let slide
    
    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$apply()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.expert-profile.similar-experts-slider')
      module('ui.router')
      module('profitelo.components.interface.slider')
      
      inject(($rootScope, $compile, _$componentController_, _$state_) => {
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

      component = componentController('similarExpertsSlider', {$element: el, $scope: rootScope, $state: $state}, bindings)
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should compile the component', () => {
      el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should go to next-slide', () => {
      const $scope = rootScope
      $scope.controlls = {
        nextSlide: () => {
          return 1011
        }
      }
      
      spyOn($scope.controlls, 'nextSlide')
      component.nextSlide()
      expect($scope.controlls.nextSlide).toHaveBeenCalled()
    })

    it('should go to prev-slide', () => {
      const $scope = rootScope
      $scope.controlls = {
        prevSlide: () => {
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
        owner: {
          type: 'ORG'
        }
      }
      component.goToProfile(consultation)
      expect($state.go).toHaveBeenCalledWith('app.company-profile', {contactId: consultation.owner.id, primaryConsultationId: consultation.id})
    })
    
  })
})
