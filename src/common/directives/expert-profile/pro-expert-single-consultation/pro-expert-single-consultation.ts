import * as angular from "angular"
import {UrlService} from "../../../services/url/url.service"
import {CallService} from "../../../components/communicator/call.service"
import filtersModule from "../../../filters/filters"
import communicatorModule from "../../../components/communicator/communicator"
import urlModule from "../../../services/url/url"
import "common/components/pro-summary-tag/pro-summary-tag"
import "common/components/interface/collapse-tab/collapse-tab"

function directive(callService: CallService, urlService: UrlService) {

  function linkFunction(scope: any, _elem: ng.IRootElementService, _attrs: ng.IAttributes) {

    scope.startCall = () => {
      callService.callServiceId(scope.serviceTagsEmployeesTuple.service.id)
    }

    scope.tags = scope.serviceTagsEmployeesTuple.tags

    scope.companyImage = !!scope.serviceTagsEmployeesTuple.ownerProfile.organizationDetails
    && scope.serviceTagsEmployeesTuple.ownerProfile.organizationDetails.logo !== null ?
      urlService.resolveFileUrl(scope.serviceTagsEmployeesTuple.ownerProfile.organizationDetails.logo) : ''

    scope.consultation = {}

    scope.consultation.timeAverage = Math.floor((Math.random() * 10) + 1)
  }

  return {
    template: require('./pro-expert-single-consultation.jade')(),
    restrict: 'E',
    replace: true,
    link: linkFunction,
    scope: {
      serviceTagsEmployeesTuple: '=?'
    }
  }
}

angular.module('profitelo.directives.expert-profile.pro-expert-single-consultation', [
  'profitelo.components.pro-summary-tag',
  communicatorModule,
  filtersModule,
  urlModule,
  'profitelo.components.interface.collapse-tab'
])
  .directive('proExpertSingleConsultation', directive)
