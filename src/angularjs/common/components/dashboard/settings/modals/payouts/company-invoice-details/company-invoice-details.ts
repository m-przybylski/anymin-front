import * as angular from 'angular';
import inputModule from '../../../../../interface/input/input';
import commonSettingsModule from '../../../../../../services/common-settings/common-settings';
import apiModule from 'profitelo-api-ng/api.module';
import { CompanyInvoiceDetailsModalController } from './company-invoice-details.controller';
import { CompanyInvoiceDetailsModalService } from './company-invoice-details.service';
import errorHandlerModule from '../../../../../../services/error-handler/error-handler';
import translatorModule from '../../../../../../services/translator/translator';
import topAlertModule from '../../../../../../services/top-alert/top-alert';
import dropdownPrimaryModule from '../../../../../interface/dropdown-primary/dropdown-primary';

const companyInvoiceDetailsModalModule: string =
  angular.module('profitelo.components.dashboard.settings.modals.invoice-details', [
  'ui.bootstrap',
  apiModule,
  commonSettingsModule,
  'profitelo.components.interface.preloader',
  inputModule,
  errorHandlerModule,
  translatorModule,
  topAlertModule,
  dropdownPrimaryModule
])
  .controller('companyInvoiceDetailsModalController', CompanyInvoiceDetailsModalController)
  .service('companyInvoiceDetailsModalService', CompanyInvoiceDetailsModalService)
  .name;

export default companyInvoiceDetailsModalModule;
