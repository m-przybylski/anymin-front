import * as angular from 'angular'
import './expert.sass'
import {ExpertController} from './expert.controller'
import dashboardExpertActivitiesModule from './activities/activities'
import dashboardExpertEmployeesModule from './employees/employees'
import dashboardExpertComplainsModule from './complains/complains'
import expertNavigationModule from '../../../common/components/dashboard/expert/navigation/navigation'
import dashboardExpertInvoicesModule from './invoices/invoices'
import dashboardExpertManageProfileModule from './manage-profile/manage-profile'
import AvatarUploaderModule from '../../../common/components/avatar-uploader/avatar-uploader'
import {UserService} from '../../../common/services/user/user.service'

const expertDashboardModule = angular.module('profitelo.controller.dashboard.expert', [
  'ui.router',
  'ngTouch',
  expertNavigationModule,
  dashboardExpertActivitiesModule,
  dashboardExpertEmployeesModule,
  dashboardExpertComplainsModule,
  dashboardExpertInvoicesModule,
  dashboardExpertManageProfileModule,
  AvatarUploaderModule
])
.config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state('app.dashboard.expert', {
    controllerAs: 'vm',
    url: '/expert',
    abstract: true,
    template: require('./expert.pug')(),
    controller: 'expertDashboard',
    resolve: {
      isPlatformForExpert: (userService: UserService, $state: ng.ui.IStateService): void => {
        userService.getUser().then((user) => {
          if ((user.isExpert || user.isCompany)) {
            return true
          } else {
            $state.go('app.wizard.create-profile')
            return
          }
        })
      }
    },
    data: {
      pageTitle: 'PAGE_TITLE.EXPERT_DASHBOARD',
    }
  })
})
.controller('expertDashboard', ExpertController)
  .name

export default expertDashboardModule
