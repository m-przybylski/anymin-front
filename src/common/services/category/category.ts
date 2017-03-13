import * as angular from "angular"
import apiModule from "../../api/api.module"
import {CategoryService} from "./category.service"

const categoryModule = angular.module('profitelo.services.categories', [
  apiModule
]).service('categoryService', CategoryService)
  .name

export default categoryModule;
