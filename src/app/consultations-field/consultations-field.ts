import * as angular from "angular"
import {ConsultationsFieldController} from "./consultations-field.controller"
import sessionModule from "../../common/services/session/session"
import "common/directives/pro-footer/pro-footer"
import "common/directives/pro-tags-slider/pro-tags-slider"
import "common/components/pro-search-dropdown/pro-search-dropdown"
import "common/components/interface/card-slider/card-slider"

const consultationsFieldPageModule = angular.module('profitelo.controller.consultations-field', [
  'ui.router',
  sessionModule,
  'profitelo.directives.pro-footer',
  'profitelo.directives.pro-tags-slider',
  'profitelo.components.pro-search-dropdown',
  'profitelo.components.interface.card-slider'
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.consultations-field', {
      url: '/consultations-field/{fieldId:int}',
      template: require('./consultations-field.jade')(),
      controller: 'ConsultationsFieldController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'HOME.FIELD.PAGE_TITLE'
      }
    })
  })
  .controller('ConsultationsFieldController', ConsultationsFieldController)
  .name

export default consultationsFieldPageModule
