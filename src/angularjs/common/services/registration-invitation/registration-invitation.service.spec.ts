import * as angular from 'angular'
import registrationInvitationModule from './registration-invitation'
import {RegistrationInvitationService} from './registration-invitation.service'
import {IInvitationObject} from '../../../app/invitations/invitation.interface'

describe('Unit testing: profitelo.services.registration-invitation>', () => {
  describe('for profitelo.services.registration-invitation >', () => {

    let registrationInvitationService: RegistrationInvitationService

    beforeEach(() => {
      angular.mock.module(registrationInvitationModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))


    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      registrationInvitationService =
        $injector.get<RegistrationInvitationService>('registrationInvitationService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should return correct invitation object', () => {
      const mockInvitationObject: IInvitationObject = {
        token: 'token',
        email: 'jakto@itelo.pl'
      }
      localStorage.setItem('invitation', JSON.stringify(mockInvitationObject))
      expect(registrationInvitationService.getInvitationObject()).toEqual(mockInvitationObject)
    })

  })
})
