import * as angular from 'angular'
import {DashboardExpertEmployeesController} from './employees.controller'
import expertEmployeeModule from '../../../../common/components/dashboard/expert/employees/employee/employee';
import './employees.sass'
import modalsModule from '../../../../common/services/modals/modals'
import apiModule from 'profitelo-api-ng/api.module'
import pendingInvitationModule
  from '../../../../common/components/dashboard/expert/employees/pending-invitation/pending-invitation'

const  dashboardExpertEmployeesModule = angular.module('profitelo.controller.dashboard.expert.employees', [
  'ui.router',
  'profitelo.components.interface.preloader-container',
  expertEmployeeModule,
  modalsModule,
  apiModule,
  pendingInvitationModule
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.expert.employees', {
      url: '/employees',
      template: require('./employees.pug'),
      controller: 'dashboardExpertEmployeesController',
      controllerAs: 'vm'
    })
  })
  .controller('dashboardExpertEmployeesController', DashboardExpertEmployeesController)
  .name

export default dashboardExpertEmployeesModule
