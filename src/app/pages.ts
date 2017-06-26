import * as angular from 'angular'
import homePageModule from './home/home'
import errorPageModule from './error/error'
import loginPageModule from './login/login'
import searchResultPageModule from './search/search-result'
import expertProfilePageModule from './expert-profile/expert-profile'
import companyProfilePageModule from './company-profile/company-profile'
import postRegisterPageModule from './post-register/post-register'
import dashboardPageModule from './dashboard/dashboard'
import wizardPageModule from './wizard/wizard'
import invitationsPageModule from './invitations/invitations'

const pagesModule = angular.module('profitelo.pages', [
  dashboardPageModule,
  homePageModule,
  loginPageModule,
  searchResultPageModule,
  expertProfilePageModule,
  companyProfilePageModule,
  postRegisterPageModule,
  errorPageModule,
  invitationsPageModule,
  wizardPageModule
])
  .name;

export default pagesModule;
