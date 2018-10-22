// tslint:disable:max-line-length
import { Injectable, Injector } from '@angular/core';
import { Logger } from '@platform/core/logger';
import { LoggerFactory, MoneyToAmount, AlertService } from '@anymind-ng/core';
import { GenerateWidgetComponent } from '../components/generate-widget/generate-widget.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GENERATE_WIDGET_DATA, IGenerateWidgetData } from '../tokens';
import { ClipboardService } from '@platform/core/services/clipboard/clipboard.service';

@Injectable()
export class GenerateWidgetService extends Logger {
  private moneyToAmount: MoneyToAmount;
  constructor(
    private injector: Injector,
    private modalService: NgbModal,
    private clipboardService: ClipboardService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory);
    this.moneyToAmount = new MoneyToAmount(this.loggerService);
  }

  public openModal({ serviceId, expertId, widgetId }: IGenerateWidgetData): NgbModalRef {
    return this.modalService.open(GenerateWidgetComponent, {
      injector: Injector.create({
        providers: [
          {
            provide: GENERATE_WIDGET_DATA,
            useValue: {
              serviceId,
              expertId,
              widgetId,
            },
          },
        ],
        parent: this.injector,
      }),
    });
  }
  public saveToClipboard(textToCopy: string): void {
    this.clipboardService
      .writeText(textToCopy)
      .then(this.showSuccessOnSuccess.bind(this), this.showWarningOnFailure.bind(this));
  }
  private showWarningOnFailure(): void {
    this.alertService.pushWarningAlert('GENERATE_WIDGET_MODAL.CLIPBOARD_COPY.FAIL');
  }
  private showSuccessOnSuccess(): void {
    this.alertService.pushSuccessAlert('GENERATE_WIDGET_MODAL.CLIPBOARD_COPY.SUCCESS');
  }
}
