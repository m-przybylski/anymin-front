import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayoutMethodComponent } from '@platform/features/dashboard/views/user-dashboard/payments/components/payout-method/payout-method.component';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '@anymind-ng/core';

@Component({
  selector: 'plat-payments',
  templateUrl: './payments.view.component.html',
  styleUrls: ['./payments.view.component.sass'],
})
export class PaymentsViewComponent {
  constructor(private alertService: AlertService, private route: ActivatedRoute, private ngbModalService: NgbModal) {}

  public openInvoiceModal = (): void => {
    this.alertService.pushWarningAlert('ALERT.NOT_SUPPORTED');
    // TODO waiting for backend
    // this.ngbModalService.open(
    //   InvoiceComponent,
    // ).componentInstance.getPayoutMethod = this.route.snapshot.data.getPayoutMethod;
  };

  public openPayoutMethod = (): void => {
    this.ngbModalService.open(
      PayoutMethodComponent,
    ).componentInstance.getPayoutMethod = this.route.snapshot.data.getPayoutMethod;
  };
}
