// tslint:disable:no-mixed-interface
// tslint:disable:prefer-method-signature
// tslint:disable:new-parens
import * as angular from 'angular';
import { SingleConsultationEditComponent } from './single-consultation-edit.component';
import tagsListModule from '../../../tags-list/tags-list';
import { PostService } from 'profitelo-api-ng/model/models';
import translatorWrapperModule, { default as translatorModule } from '../../../../services/translator/translator';
import modalsModule from '../../../../services/modals/modals';

export interface ISingleConsultationEditComponentBindings extends ng.IController {
  service: PostService;
  onEdit: (service: PostService) => void;
  onRemove: (service: PostService) => void;
  isCompany: boolean;
}

const singleConsultationEditModule = angular
  .module('profitelo.component.wizard.summary.single-consultation-edit', [
    tagsListModule,
    modalsModule,
    translatorWrapperModule,
    translatorModule,
  ])
  .component('singleConsultationEdit', new SingleConsultationEditComponent()).name;

export default singleConsultationEditModule;
