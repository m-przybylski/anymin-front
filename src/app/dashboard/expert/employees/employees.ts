import * as angular from 'angular'
import {DashboardExpertEmployeesController} from './employees.controller'
import expertEmployeeModule from '../../../../common/components/dashboard/expert/employees/employee/employee';
import expertEmployeesFiltersModule from '../../../../common/components/dashboard/expert/employees/filters/filters';
import './employees.sass'

const  dashboardExpertEmployeesModule = angular.module('profitelo.controller.dashboard.expert.filters', [
  'ui.router',
  expertEmployeesFiltersModule,
  expertEmployeeModule
])
  .config(function ($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.dashboard.expert.employees', {
      url: '/employees',
      template: require('./employees.pug')(),
      controller: 'dashboardExpertEmployeesController',
      controllerAs: 'vm'
    })
  })
  .controller('dashboardExpertEmployeesController', DashboardExpertEmployeesController)
  .name

export default dashboardExpertEmployeesModule
