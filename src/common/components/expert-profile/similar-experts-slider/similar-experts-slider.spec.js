// describe('Unit testing: profitelo.components.dashboard.invitation.pro-invitation-acceptance-box', () => {
//   return describe('for proInvitationAcceptanceBox component >', () => {
//
//     const url = 'awesomUrl'
//
//     let scope
//     let rootScope
//     let compile
//     let componentController
//     let component
//     let element
//     let timeout
//     let bindings
//     let resourcesExpectations
//     let httpBackend
//     let EmploymentApiDef
//     let EmploymentApi
//     let validHTML = '<pro-invitation-acceptance-box data-employment="::employment" data-invitation="::invitation")></pro-invitation-acceptance-box>'
//
//     function create(html) {
//       scope = rootScope.$new()
//       let elem = angular.element(html)
//       let compiledElement = compile(elem)(scope)
//       scope.$digest()
//       return compiledElement
//     }
//
//     beforeEach(module(function($provide) {
//       $provide.value('apiUrl', url)
//     }))
//
//     beforeEach(() => {
//       module('templates-module')
//       module('profitelo.swaggerResources.definitions')
//       module('profitelo.components.dashboard.invitation.pro-invitation-acceptance-box')
//
//       inject(($rootScope, $compile, $timeout, $httpBackend, _$componentController_, _EmploymentApi_, _EmploymentApiDef_) => {
//         componentController = _$componentController_
//         rootScope = $rootScope.$new()
//         compile = $compile
//         EmploymentApi = _EmploymentApi_
//         timeout = $timeout
//         httpBackend = $httpBackend
//         EmploymentApiDef = _EmploymentApiDef_
//       })
//      
//       element = create(validHTML)
//       bindings = {}
//       component = componentController('proInvitationAcceptanceBox', {$element: element, $scope: scope}, bindings)
//      
//       resourcesExpectations = {
//         EmploymentApi: {
//           postEmploymentsAccept: httpBackend.when(EmploymentApiDef.postEmploymentsAccept.method, EmploymentApiDef.postEmploymentsAccept.url),
//           postEmploymentsReject: httpBackend.when(EmploymentApiDef.postEmploymentsReject.method, EmploymentApiDef.postEmploymentsReject.url)
//         }
//       }
//
//     })
//
//     it('should have a dummy test', inject(() => {
//       expect(true).toBeTruthy()
//     }))
//
//     it('should compile the component', () => {
//       expect(element.html()).toBeDefined(true)
//     })
//
//     it('should get response on accept employee', () => {
//       resourcesExpectations.EmploymentApi.postEmploymentsAccept.respond(200)
//       component.accept(':employmentId')
//       httpBackend.flush()
//       expect(component.employment).toBeDefined(true)
//       expect(component.employment.employmentId).toMatch(':employmentId')
//     })
//
//     it('should get error on accept employee', () => {
//       resourcesExpectations.EmploymentApi.postEmploymentsAccept.respond(400)
//       component.accept(':employmentId')
//       httpBackend.flush()
//       expect(component.employment).not.toBeDefined(true)
//     })
//    
//     it('should get response on reject employee ', () => {
//       resourcesExpectations.EmploymentApi.postEmploymentsReject.respond(200)
//       component.reject(':employmentId')
//       timeout.flush()
//       httpBackend.flush()
//       expect(component.employment).toBeDefined(true)
//       expect(component.rejectTimeoutSet).toBeDefined(false)
//       expect(component.employment.employmentId).toMatch(':employmentId')
//     })
//
//     it('should get error on reject employee ', () => {
//       resourcesExpectations.EmploymentApi.postEmploymentsReject.respond(400)
//       component.reject(':employmentId')
//       timeout.flush()
//       httpBackend.flush()
//       expect(component.employment).not.toBeDefined(true)
//       expect(component.rejectTimeoutSet).toBeDefined(false)
//     })
//
//     it('should set this.idRejected and this.isAccepted on call abort abortRejection ', () => {
//       component.abortRejection()
//       expect(component.isRejected).toBe(false)
//       expect(component.isAccepted).toBe(false)
//     })
//
//   })
// })
