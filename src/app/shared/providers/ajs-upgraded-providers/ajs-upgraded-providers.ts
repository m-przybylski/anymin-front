import * as angular from 'angular';
import { FactoryProvider } from '@angular/core';
import {
  LoginConfirmEmailResolver
} from '../../../../angularjs/common/resolvers/login-confirm-email/login-confirm-email.service';
import { UserService } from '../../../../angularjs/common/services/user/user.service';
import { EventsService } from '../../../../angularjs/common/services/events/events.service';

const UserServiceFactory = ($injector: angular.auto.IInjectorService): UserService =>
  $injector.get('userService');

const EventsServiceFactory = ($injector: angular.auto.IInjectorService): EventsService =>
  $injector.get('eventsService');

const LoginConfirmEmailResolverFactory = ($injector: angular.auto.IInjectorService): LoginConfirmEmailResolver =>
  $injector.get('LoginConfirmEmailResolver');

export const UserServiceProvider: FactoryProvider = {
  provide: UserService,
  useFactory: UserServiceFactory,
  deps: ['$injector']
};

export const EventsServiceProvider: FactoryProvider = {
  provide: EventsService,
  useFactory: EventsServiceFactory,
  deps: ['$injector']
};

export const LoginConfirmEmailResolverProvider: FactoryProvider = {
  provide: LoginConfirmEmailResolver,
  useFactory: LoginConfirmEmailResolverFactory,
  deps: ['$injector']
};
