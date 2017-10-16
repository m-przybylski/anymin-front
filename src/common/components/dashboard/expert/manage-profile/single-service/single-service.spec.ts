import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import singleServiceModule, {ISingleServiceComponentBindings} from './single-service'
import {SingleServiceComponentController, ISingleServiceComponentControllerScope} from './single-service.controller'
import {GetExpertServiceDetails, Tag} from 'profitelo-api-ng/model/models'
import userModule from '../../../../../services/user/user'
import {UserService} from '../../../../../services/user/user.service'
import {ModalsService} from '../../../../../services/modals/modals.service'

describe('Unit testing: profitelo.components.dashboard.expert.manage-profile.single-service', () => {
  return describe('for singleService >', () => {

    let scope: ISingleServiceComponentControllerScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: SingleServiceComponentController
    let serviceDetails: GetExpertServiceDetails
    let modalsService: ModalsService
    const userService: UserService  = <UserService>{
      getUser: {}
    }
    const validHTML = '<single-service data-service="service"></single-service>'

    serviceDetails = {
      service: {
        id: 'id',
        ownerId: 'ownerId',
        name: 'name',
        description: 'description',
        price: {
          amount: 123,
          currency: 'PLN'
        },
        rating: 123,
        usageCounter: 123,
        usageDurationInSeconds: 123,
        isSuspended: false,
        language: 'pl',
        createdAt: 123
      },
      ownerProfile: {
        id: 'id',
        isActive: false,
        expertDetails: {
          name: 'name',
          avatar: 'avatar',
          description: 'desc',
          files: ['file'],
          links: ['link']
        }
      },
      tags: [{
        id: 'id',
        name: 'name',
        status: Tag.StatusEnum.NEW,
        persisted: false
      }]
    }

    function create(html: string): JQuery {
      scope = <ISingleServiceComponentControllerScope>rootScope.$new()
      scope.serviceDetails = serviceDetails
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {

      angular.mock.module(singleServiceModule)
      angular.mock.module(userModule)

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $q: ng.IQService,
              _$componentController_: ng.IComponentControllerService, _modalsService_: ModalsService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        modalsService = _modalsService_
        spyOn(userService, 'getUser').and.returnValue($q.resolve({}))
        compile = $compile
        const injectors = {
          $scope: rootScope,
          modalService: modalsService,
          $document: document,
          userService: userService
        }

        const bindings: ISingleServiceComponentBindings = {
          onModalClose: (): void => {},
          serviceDetails
        }

        component = componentController<SingleServiceComponentController, {}>('singleService', injectors, bindings)
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the directive', () => {
        const el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })

      it('should open modal form service', inject(() => {
        spyOn(modalsService, 'createServiceFormModal')
        component.openConsultationFormModal()
        expect(modalsService.createServiceFormModal).toHaveBeenCalled()
      }))
    })
  })
})
