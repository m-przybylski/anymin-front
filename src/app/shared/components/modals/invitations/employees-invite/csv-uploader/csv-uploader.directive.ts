// tslint:disable:no-require-imports
// tslint:disable:no-var-requires
import { Directive, HostListener, Input } from '@angular/core';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { ParseError, ParseResult } from 'papaparse';
const Papa = require('papaparse');

@Directive({
  selector: '[csvUploader]',
})
export class CsvUploaderDirective {
  @Input()
  public onLoadFile: (result: ReadonlyArray<string>) => void;

  @Input()
  public showCSVstatus: (error: ReadonlyArray<ParseError>) => void;

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
            complete: (result: ParseResult): void => {
              this.onLoadFile(result.data);
              this.showCSVstatus(result.errors);
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
