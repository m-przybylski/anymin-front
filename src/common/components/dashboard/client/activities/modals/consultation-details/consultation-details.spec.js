// describe('Unit testing: profitelo.components.dashboard.client.activities.modals.consultation-details', () => {
//   return describe('for clientConsultationDetails >', () => {
//
//     let rootScope
//     let compile
//     let componentController
//     let component
//     let validHTML = '<client-consultation-details></client-consultation-details>'
//
//
//     beforeEach(() => {
//       module('templates-module')
//       module('profitelo.swaggerResources')
//       module('profitelo.components.interface.collapse-btn')
//       module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain')
//       module('profitelo.components.dashboard.client.activities.modals.consultation-details.consultation-details-chat')
//       module('profitelo.components.dashboard.client.activities.modals.consultation-details.recommended-tags')
//       module('profitelo.services.helper')
//       module('profitelo.components.dashboard.client.activities.modals.consultation-details')
//
//       inject(($rootScope, $compile, _$componentController_, _HelperService_, _$log_, _$httpBackend_) => {
//         componentController = _$componentController_
//         rootScope = $rootScope.$new()
//         compile = $compile
//
//         const injectors = {
//           HelperService: _HelperService_,
//           log: _$log_,
//           httpBackend: _$httpBackend_
//         }
//
//         component = componentController('clientConsultationDetails', injectors, {})
//       })
//     })
//
//     it('should have a dummy test', inject(() => {
//       expect(true).toBeTruthy()
//     }))
//
//     it('should compile the directive', () => {
//       let el = create(validHTML)
//       expect(el.html()).toBeDefined(true)
//     })
//   })
// })
