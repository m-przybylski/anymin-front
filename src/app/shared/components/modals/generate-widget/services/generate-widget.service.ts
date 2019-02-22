// tslint:disable:max-line-length
import { Injectable, Injector } from '@angular/core';
import { Logger } from '@platform/core/logger';
import { LoggerFactory, AlertService } from '@anymind-ng/core';
import { GenerateWidgetComponent } from '../components/generate-widget/generate-widget.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GENERATE_WIDGET_DATA, IGenerateWidgetData } from '../tokens';
import { ClipboardService } from '@platform/core/services/clipboard/clipboard.service';

@Injectable()
export class GenerateWidgetService extends Logger {
  constructor(
    private injector: Injector,
    private modalService: NgbModal,
    private clipboardService: ClipboardService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('GenerateWidgetService'));
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

  public saveToClipboard(textToCopy: string, successMsg?: string): void {
    this.clipboardService.writeText(textToCopy).then(() => {
      this.onSuccess.bind(this)(successMsg);
    }, this.onFailure.bind(this));
  }

  private onFailure(): void {
    this.alertService.pushWarningAlert('GENERATE_WIDGET_MODAL.CLIPBOARD_COPY.FAIL');
  }

  private onSuccess(successMsg?: string): void {
    const msg = successMsg || 'GENERATE_WIDGET_MODAL.CLIPBOARD_COPY.SUCCESS';
    this.alertService.pushSuccessAlert(msg);
  }
}
