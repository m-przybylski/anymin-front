import { Directive, HostListener, EventEmitter, Output } from '@angular/core';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import * as Papa from 'papaparse';

@Directive({
  selector: '[csvUploader]',
})
export class CsvUploaderDirective {
  @Output()
  public fileLoaded = new EventEmitter<ReadonlyArray<string>>();

  @Output()
  public showCSVstatus = new EventEmitter<ReadonlyArray<Papa.ParseError>>();

  private logger: LoggerService;

  constructor(private alertService: AlertService, loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('CsvUploaderDirective');
  }

  @HostListener('change', ['$event'])
  public inputChanged = (event: MSInputMethodContext): void => {
    const element = event.target as HTMLInputElement;
    if (element.files !== null && element.files[0]) {
      if (element.value) {
        const reader = new FileReader();
        reader.onload = (): void => {
          Papa.parse((element.files as FileList)[0], {
            complete: (result): void => {
              this.fileLoaded.emit(result.data);
              this.showCSVstatus.emit(result.errors);
            },
          });
          element.value = '';
        };
        (reader.onerror as any) = (err: ErrorEvent): void => {
          this.logger.error('Can not read file', err);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        };

        reader.readAsDataURL(element.files[0]);
      }
    } else {
      this.logger.warn('No file');
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    }
  };
}
