import * as angular from 'angular'
import { Provider } from '@angular/core'
import {
  LoginConfirmEmailResolver
} from '../../../../angularjs/common/resolvers/login-confirm-email/login-confirm-email.service';

export const LoginConfirmEmailResolverProvider: Provider = {
  provide: LoginConfirmEmailResolver,
  useFactory: (i: angular.auto.IInjectorService): LoginConfirmEmailResolver => i.get('LoginConfirmEmailResolver'),
  deps: ['$injector']
};
