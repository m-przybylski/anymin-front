import * as angular from 'angular';
import { RegistrationInvitationService } from './registration-invitation.service';

const registrationInvitationModule = angular.module('profitelo.services.registration-invitation', [])
.service('registrationInvitationService', RegistrationInvitationService)
  .name;

export default registrationInvitationModule;
