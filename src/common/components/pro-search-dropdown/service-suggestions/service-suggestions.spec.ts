namespace profitelo.components.proSearchDropdown.serviceSuggestions {
  import ICommonSettingsService = profitelo.services.commonSettings.ICommonSettingsService
  describe('Unit testing: profitelo.components.pro-search-dropdown.service-suggestions', () => {
    return describe('for serviceSuggestions >', () => {

      let scope: any
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let componentController: any
      let component: any
      let CommonSettingsService: ICommonSettingsService
      let validHTML = '<service-suggestions></service-suggestions>'
      let state: ng.ui.IStateService

      function create(html: string) {
        scope = rootScope.$new()
        let elem = angular.element(html)
        let compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      const bindings = {
        services: {
          results: ""
        },
        searchModel: ''
      }

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('ui.router')
        angular.mock.module('profitelo.services.commonSettings')
        angular.mock.module('profitelo.filters.search-bold-filter')
        angular.mock.module('profitelo.components.pro-search-dropdown.service-suggestions')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
                _$componentController_: ng.IComponentControllerService, _$state_: ng.ui.IStateService,
                _CommonSettingsService_: ICommonSettingsService) => {
          componentController = _$componentController_
          rootScope = $rootScope.$new()
          compile = $compile
          CommonSettingsService = _CommonSettingsService_
          state = _$state_
        })

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope,
          $state: state
        }

        component = componentController('serviceSuggestions', injectors, bindings)
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the directive', () => {
        let el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })


      it('should goToProfile', () => {
        const indexOfService = 0

        component.services = {
          results: [
            {
              id: 1,
              owner: {
                type: "ORG",
                id: 1
              }
            }
          ]
        }

        spyOn(state, 'go')
        component.goToProfile(indexOfService)
        expect(state.go).toHaveBeenCalledWith('app.company-profile', Object({
          profileId: component.services.results[0].owner.id,
          primaryConsultationId: component.services.results[0].id
        }))
      })

      it('should goToProfile else', () => {
        const indexOfService = 0

        component.services = {
          results: [
            {
              id: 1,
              owner: {
                type: "ORGS",
                id: 1
              }
            }
          ]
        }

        spyOn(state, 'go')
        component.goToProfile(indexOfService)
        expect(state.go).toHaveBeenCalledWith('app.expert-profile', Object({
          profileId: component.services.results[0].owner.id,
          primaryConsultationId: component.services.results[0].id
        }))
      })

      it('should profileImage', () => {
        const index = 0

        component.services = {
          results: [
            {
              id: 1,
              owner: {
                type: "ORGS",
                id: 1,
                img: "url"
              }
            }
          ]
        }

        component.profileImage(index)
        expect(CommonSettingsService.links.imageUrl).toBeDefined()

      })
    })
  })
}
