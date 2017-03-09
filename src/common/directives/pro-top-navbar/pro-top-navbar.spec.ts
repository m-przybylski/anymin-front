import * as angular from "angular"
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import userModule from "../../services/user/user"
import {SearchService} from "../../services/search/search.service"
import {SmoothScrollingService} from "../../services/smooth-scrolling/smooth-scrolling.service"


describe('Unit testing: profitelo.directives.pro-top-navbar', () => {
  return describe('for pro-top-navbar directive >', () => {

    let scope: any = null
    let rootScope: ng.IRootScopeService
    let $state: ng.ui.IStateService
    let compile: any = null
    let validHTML = '<pro-top-navbar data-logout-action="vm.logout"></pro-top-navbar>'
    let smoothScrollingService
    let location: ng.ILocationService
    let searchService: SearchService
    let $httpBackend: ng.IHttpBackendService
    const userService = {
      getUser: () => {
      }
    }

    beforeEach(() => {
      angular.mock.module(userModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', '')
      $provide.value('userService', userService)
    }))

    beforeEach(() => {
      //angular.mock.module('templates-module')
      angular.mock.module('profitelo.directives.pro-top-navbar')
      angular.mock.module('profitelo.services.search')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$httpBackend_: ng.IHttpBackendService,
              _smoothScrollingService_: SmoothScrollingService, _$state_: ng.ui.IStateService,
              _$location_: ng.ILocationService, _searchService_: SearchService, $q: ng.IQService) => {

        spyOn(userService, 'getUser').and.callFake(() => $q.resolve({id: '123'}))

        rootScope = $rootScope.$new()
        compile = $compile
        $state = _$state_
        smoothScrollingService = _smoothScrollingService_
        location = _$location_
        searchService = _searchService_
        $httpBackend = _$httpBackend_
      })
    })

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      scope.vm = {
        logout: () => {
          return null
        },
        sidebarHandler: () => {
          return null
        }
      }
      let compiledElement = compile(elem)(scope)

      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should call scope logoutAction', inject(() => {
      const el = create(validHTML)
      let isoScope = el.isolateScope()
      spyOn(isoScope, 'logoutAction')
      isoScope.logout()
      expect(isoScope.logoutAction).toHaveBeenCalled()
    }))

    it('should set scope.showResponsiveMenu to true', inject(() => {
      const el = create(validHTML)
      let isoScope = el.isolateScope()
      isoScope.showResponsiveMenu = false
      isoScope.sidebarAction()
      expect(isoScope.showResponsiveMenu).toEqual(true)
      expect(isoScope.showUserMenuOnClick).toEqual(false)
    }))

    it('should call scope.sidebarHandler', inject(() => {
      validHTML = '<pro-top-navbar data-logout-action="vm.logout" sidebar-handler="vm.sidebarHandler"></pro-top-navbar>'
      const el = create(validHTML)
      let isoScope = el.isolateScope()
      spyOn(isoScope, 'sidebarHandler')
      isoScope.sidebarAction()
      expect(isoScope.sidebarHandler).toHaveBeenCalled()
    }))

    it('should call state go on search', inject(() => {
      const el = create(validHTML)
      let isoScope = el.isolateScope()
      spyOn($state, 'go')
      isoScope.searchAction()
      expect($state.go).toHaveBeenCalledWith('app.search-result')
    }))

    it('should call searchService.setSearchQueryParams on search', inject(() => {
      $state.current = {
        name: 'app.search-result'
      }
      const el = create(validHTML)
      let isoScope = el.isolateScope()
      el.find('.search-bar-container input').focus()
      rootScope.$digest()
      spyOn(searchService, 'setSearchQueryParams')
      isoScope.searchAction()
      expect(searchService.setSearchQueryParams).toHaveBeenCalled()
    }))

    /*it('should call sidebarAction', inject(() => {
      const el = create(validHTML)
      let isoScope = el.isolateScope()
      isoScope.showResponsiveMenu = true
      isoScope.sidebarStatus = true
      spyOn(isoScope, 'sidebarAction')
      isoScope.hideOtherMenus()
      expect(isoScope.sidebarAction).toHaveBeenCalled()
    }))*/

  })
})
