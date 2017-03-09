import * as angular from "angular"
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {EmploymentApiMock, EmploymentApi} from "../../../../api/api/EmploymentApi"
describe('Unit testing: profitelo.components.dashboard.invitation.pro-invitation-acceptance-box', () => {
  return describe('for proInvitationAcceptanceBox component >', () => {

    const url = 'awesomUrl'

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let element: any
    let timeout: ng.ITimeoutService
    let bindings: any
    let httpBackend: ng.IHttpBackendService
    let EmploymentApiMock: any
    let EmploymentApi
    let validHTML = '<pro-invitation-acceptance-box data-employment="::employment" data-invitation="::invitation")></pro-invitation-acceptance-box>'

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      //angular.mock.module('templates-module')
      angular.mock.module('profitelo.components.dashboard.invitation.pro-invitation-acceptance-box')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $timeout: ng.ITimeoutService,
              $httpBackend: ng.IHttpBackendService, _$componentController_: ng.IComponentControllerService,
              _EmploymentApi_: EmploymentApi, _EmploymentApiMock_: EmploymentApiMock) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        EmploymentApi = _EmploymentApi_
        timeout = $timeout
        httpBackend = $httpBackend
        EmploymentApiMock = _EmploymentApiMock_
      })

      element = create(validHTML)
      bindings = {}
      component = componentController('proInvitationAcceptanceBox', {$element: element, $scope: scope}, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      expect(element.html()).toBeDefined(true)
    })

    it('should get response on accept employee', () => {
      EmploymentApiMock.postEmploymentsAcceptRoute(200, ':employmentId', {employmentId: ':employmentId'})
      component.accept(':employmentId')
      httpBackend.flush()
      expect(component.employment).toBeDefined(true)
      expect(component.employment.employmentId).toMatch(':employmentId')
    })

    it('should get error on accept employee', () => {
      EmploymentApiMock.postEmploymentsAcceptRoute(400, ':employmentId')
      component.accept(':employmentId')
      httpBackend.flush()
      expect(component.employment).not.toBeDefined(true)
    })

    it('should get response on reject employee ', () => {
      EmploymentApiMock.postEmploymentsRejectRoute(200, ':employmentId', {employmentId: ':employmentId'})
      component.reject(':employmentId')
      timeout.flush()
      httpBackend.flush()
      expect(component.employment).toBeDefined(true)
      expect(component.rejectTimeoutSet).toBeDefined(false)
      expect(component.employment.employmentId).toMatch(':employmentId')
    })

    it('should get error on reject employee ', () => {
      EmploymentApiMock.postEmploymentsRejectRoute(400, ':employmentId')
      component.reject(':employmentId')
      timeout.flush()
      httpBackend.flush()
      expect(component.employment).not.toBeDefined(true)
      expect(component.rejectTimeoutSet).toBeDefined(false)
    })

    it('should set this.idRejected and this.isAccepted on call abort abortRejection ', () => {
      component.abortRejection()
      expect(component.isRejected).toBe(false)
      expect(component.isAccepted).toBe(false)
    })

  })
})
