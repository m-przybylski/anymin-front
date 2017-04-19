import * as angular from 'angular'
import {UserService} from './user.service'
import userModule from './user'
import eventsModule from '../events/events'
import sessionModule from '../session/session'
import {AccountDetails, AccountLogin} from 'profitelo-api-ng/model/models'
describe('Unit testing: profitelo.services.userService >', () => {
  describe('for profitelo.services.userService >', () => {

    let userService: UserService
    let rootScope: ng.IRootScopeService
    let q: ng.IQService
    let resolverParam: any
    const accountDetails: AccountDetails = {
      hasMobilePin: true,
      permissions: [],
      countryISO: 'PLN',
      msisdn: '+48987654321',
      registeredAt: 12121996,
      id: 'dgklng;kggerklt54545',
      isClientCompany: true,
      currency: 'PLN',
      isCompany: true,
      isExpert: true,
      hasPassword: true,
      doesMsisdnMatchCountry: true,
      isBlocked: false,
      protectedViews: [],
      settings: {
        isAnonymous: true,
        nickname: 'Janek Dzbanek'
      },

    }

    const eventsService = {
      emit: (param: string) => {
        return param
      }
    }

    const sessionService = {
      getSession: () => {
        return resolverParam
      },
      logout: () => {
        return q.resolve()
      },
      login: (_loginDetails: AccountLogin) => {
        return q.resolve()
      }
    }

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', 'awesome')
    }))

    beforeEach(() => {
      angular.mock.module(userModule)
      angular.mock.module(eventsModule)
      angular.mock.module(sessionModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('eventsService', eventsService)
      $provide.value('sessionService', sessionService)
    }))

    beforeEach(inject(($injector: ng.auto.IInjectorService, $rootScope: angular.IRootScopeService, $q: ng.IQService) => {
      userService = $injector.get<UserService>('userService')
      rootScope = $rootScope
      q = $q

      resolverParam = q.resolve({account: accountDetails})
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should get user data', () => {
      userService.getUser().then((res) => {
        expect(res).toEqual(accountDetails)
      })
      rootScope.$digest()
    })

    it('should throw error', () => {
      resolverParam = q.resolve({})
      expect(function() {
        userService.getUser(false)
        rootScope.$digest()
      }).toThrowError()
    })

    it('should logout user', () => {
      spyOn(eventsService, 'emit')
      userService.logout().then(() => {
        expect(eventsService.emit).toHaveBeenCalledWith('logout')
      })
      rootScope.$digest()
    })

    it('should login user', () => {
      spyOn(eventsService, 'emit')
      userService.login({msisdn: '+48123456789', password: 'ToJestProfitelo'}).then(() => {
        expect(eventsService.emit).toHaveBeenCalledWith('login')
      })
      rootScope.$digest()
    })

  })
})
