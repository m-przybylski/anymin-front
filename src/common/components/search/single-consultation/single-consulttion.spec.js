describe('Unit testing:profitelo.components.search.single-consultation', () => {
  return describe('for single-consultation component >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<single-consultation data-consultation="{id: 1, owner: {img: 1212, type: ORG}}"></single-consultation>'
    let state
    
    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }
    
    const callService = {
      callServiceId: () => {
        return null
      }
    }

    beforeEach(() => {
      module('profitelo.services.call')
      module('templates-module')
      module('profitelo.components.search.single-consultation')
    })
    
    beforeEach(module(($provide) => {
      $provide.value('callService', callService)
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      
      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      const bindings = {
        consultation: {
          id: 1,
          owner: {
            type: 'ORG'
          }
        }
      }

      state = {
        go: () => {
          return null
        }
      }
      
      component = componentController('singleConsultation', {$element: validHTML, $scope: scope,
      callService: callService, $state: state}, bindings)

    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
    
    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should set isLinkActive to false', () => {
      const el = create(validHTML)
      const isoScope = el.isolateScope()
      el.find('.btn.btn-success').triggerHandler('mouseover')
      expect(isoScope.vm.isLinkActive).toBe(false)
    })

    it('should set isLinkActive to true', () => {
      const el = create(validHTML)
      const isoScope = el.isolateScope()
      el.find('.btn.btn-success').triggerHandler('mouseover')
      el.find('.btn.btn-success').triggerHandler('mouseout')
      expect(isoScope.vm.isLinkActive).toBe(true)
    })

    it('should call state go', () => {
      spyOn(state, 'go')
      component.goToProfile()
      expect(state.go).toHaveBeenCalled()
    })

    it('should call state go', () => {
      spyOn(callService, 'callServiceId')
      component.startCall()
      expect(callService.callServiceId).toHaveBeenCalled()
    })

    it('should set profile image as null', () => {
      validHTML = '<single-consultation data-consultation="{id: 1, owner: {type: ORG}}"></single-consultation>'
      const el = create(validHTML)
      const isoScope = el.isolateScope()
      expect(isoScope.vm.profileImage).toEqual(null)
    })

  })
})
