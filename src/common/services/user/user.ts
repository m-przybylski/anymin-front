import * as angular from 'angular'
import {UserService} from './user.service'
import sessionModule from '../session/session'

const userModule = angular.module('profitelo.services.user', [
  sessionModule
])
  .service('userService', UserService)
  .name

export default userModule;
