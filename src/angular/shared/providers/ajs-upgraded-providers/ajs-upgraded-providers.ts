import * as angular from 'angular'
import { FactoryProvider } from '@angular/core'
import {
  LoginConfirmEmailResolver
} from '../../../../angularjs/common/resolvers/login-confirm-email/login-confirm-email.service';

const LoginConfirmEmailResolverFactory = ($injector: angular.auto.IInjectorService): LoginConfirmEmailResolver =>
  $injector.get('LoginConfirmEmailResolver')

export const LoginConfirmEmailResolverProvider: FactoryProvider = {
  provide: LoginConfirmEmailResolver,
  useFactory: LoginConfirmEmailResolverFactory,
  deps: ['$injector']
};
