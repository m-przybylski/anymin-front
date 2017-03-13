import * as angular from "angular"
import apiModule from "../../api/api.module"
import categoryModule from "../category/category"
import {SearchService} from "./search.service"

const searchModule = angular.module('profitelo.services.search', [
  apiModule,
  categoryModule
])
  .service('searchService', SearchService)
  .name

export default searchModule;
