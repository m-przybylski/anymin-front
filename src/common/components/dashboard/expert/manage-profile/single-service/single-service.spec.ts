import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import singleServiceModule, {ISingleServiceComponentBindings} from './single-service'
import {SingleServiceComponentController, ISingleServiceComponentControllerScope} from './single-service.controller'
import {GetExpertServiceDetails, Tag} from 'profitelo-api-ng/model/models'
import userModule from '../../../../../services/user/user'
import {UserService} from '../../../../../services/user/user.service'

describe('Unit testing: profitelo.components.dashboard.expert.manage-profile.single-service', () => {
  return describe('for singleService >', () => {

    let scope: ISingleServiceComponentControllerScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: SingleServiceComponentController
    let service: GetExpertServiceDetails
    const userService: UserService  = <UserService>{
      getUser: {}
    }
    const validHTML = '<single-service data-service="service"></single-service>'

    service = {
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
      scope.service = service
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
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        spyOn(userService, 'getUser').and.returnValue($q.resolve({}))
        compile = $compile
        const injectors = {
          $scope: rootScope,
          $document: document,
          userService: userService
        }

        const bindings: ISingleServiceComponentBindings = {
          service
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

    })
  })
})
