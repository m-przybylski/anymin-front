import {ISingleConsultationEditComponentBindings} from './single-consultation-edit'

export class SingleConsultationEditComponentController implements ISingleConsultationEditComponentBindings {

  public tagsList = [
    {'id': 'stringid', 'name': 'tagname', 'persisted': true},
    {'id': 'stringid', 'name': 'tagname2', 'persisted': true},
    {'id': 'stringid', 'name': 'tagname3', 'persisted': true}
  ]

  public employeeList = [
    {'id': 'stringid', 'name': 'Jan Kowalski', 'persisted': true},
    {'id': 'stringid', 'name': '+485004912321', 'persisted': true},
    {'id': 'stringid', 'name': 'wedzicha@gmail.com', 'persisted': true}
  ]

  /* @ngInject */
  constructor() {}
}
