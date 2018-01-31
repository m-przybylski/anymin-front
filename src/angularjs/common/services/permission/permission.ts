import * as angular from 'angular';
import { PermissionService } from './permission.service';

const permissionModule = angular.module('profitelo.services.permission', [
  'permission'
])
  .service('permissionService', PermissionService)
  .name;

export default permissionModule;
