import {CompanyInfo} from 'profitelo-api-ng/model/models'
import {ModalsService} from '../../../../common/services/modals/modals.service'

export class DashboardClientInvoicesController {
  public invoiceInfo: CompanyInfo
  public isAnyPaymentMethod = false
  public areInvoices: boolean

  /* @ngInject */
  constructor(getInvoiceData: CompanyInfo, private modalsService: ModalsService) {

    if (getInvoiceData) {
      this.invoiceInfo = getInvoiceData
      this.isAnyPaymentMethod = true
    } else {
      this.isAnyPaymentMethod = false
    }

    this.areInvoices = true

  }

  public openModal = (): void => {
    this.modalsService.createExpertConsultationSummaryModal('mockServiceId')
  }

}
