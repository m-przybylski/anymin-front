import * as angular from 'angular'
import {CookieNotificationComponent} from './cookie-notification.component'
import {CookieNotificationService} from './cookie-notification.service'

const cookieNotificationModule = angular.module('profitelo.components.cookie-notification', [
  'pascalprecht.translate',
  'ngCookies'
])
.component('cookieNotification', new CookieNotificationComponent)
.service('cookieNotificationService', CookieNotificationService)
  .name

export default cookieNotificationModule
