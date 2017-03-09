import * as angular from "angular"
import {TimerFactory} from "./timer.factory"

const timerModule = angular.module('profitelo.services.timer', [])
  .service('timerFactory', TimerFactory)
  .name

export default timerModule;
