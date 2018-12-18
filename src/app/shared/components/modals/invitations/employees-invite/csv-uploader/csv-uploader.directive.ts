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
  public inputChanged = (event: HTMLSelectElement): void => {
    if (event.target.files[0]) {
      if (event.target.value) {
        const reader = new FileReader();
        reader.onload = (): void => {
          Papa.parse(event.target.files[0], {
            complete: (result): void => {
              this.fileLoaded.emit(result.data);
              this.showCSVstatus.emit(result.errors);
            },
          });
          event.target.value = '';
        };
        reader.onerror = (err: ErrorEvent): void => {
          this.logger.error('Can not read file', err);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        };

        reader.readAsDataURL(event.target.files[0]);
      }
    } else {
      this.logger.warn('No file');
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    }
  };
}
