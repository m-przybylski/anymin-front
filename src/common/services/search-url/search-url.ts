import * as angular from "angular"
import {SearchUrlService} from "./search-url.service"
import searchModule from "../search/search"

const searchUrlModule = angular.module('profitelo.services.search-url', [
  searchModule
]).service('searchUrlService', SearchUrlService)
  .name

export default searchUrlModule;
