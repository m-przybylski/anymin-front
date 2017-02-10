namespace profitelo.components.search.singleConsultation {
  describe('Unit testing:profitelo.components.search.single-consultation', () => {
    return describe('for single-consultation component >', () => {

      let scope: any
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      let validHTML = '<single-consultation data-consultation="{id: 1, owner: {img: 1212, type: ORG}}"></single-consultation>'
      let state: ng.ui.IStateService

      function create(html: string) {
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
        angular.mock.module('profitelo.services.call')
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.components.search.single-consultation')
      })

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('callService', callService)
        $provide.value('apiUrl', 'awesomeURL')
      }))

      beforeEach(() => {

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
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

        state = <ng.ui.IStateService>{
          go: (_x: any) => {
            return {}
          }
        }

        component = componentController('singleConsultation', {
          $element: validHTML, $scope: scope,
          callService: callService, $state: state
        }, bindings)
        component.$onInit()
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
        const isoScope: any = el.isolateScope()
        el.find('.btn.btn-success').triggerHandler('mouseover')
        expect(isoScope.vm.isLinkActive).toBe(false)
      })

      it('should set isLinkActive to true', () => {
        const el = create(validHTML)
        const isoScope: any = el.isolateScope()
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
        const isoScope: any = el.isolateScope()
        expect(isoScope.vm.profileImage).toEqual(null)
      })

    })
  })
}
