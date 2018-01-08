import * as angular from 'angular'
import {TilesComponent} from './tiles.component'
import 'angular-translate'

export interface ITilesComponentBindings extends ng.IController {
}

const tilesModule = angular.module('profitelo.components.interface.tiles', [
  'pascalprecht.translate'
])
.component('tiles', new TilesComponent())
  .name

export default tilesModule
