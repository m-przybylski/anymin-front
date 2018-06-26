import { Directive, HostListener } from '@angular/core';
import { ImageCropModalComponent } from '../image-crop/image-crop.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alerts, AlertService } from '@anymind-ng/components';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';

@Directive({
  selector: '[appAvatarUploader]'
})
export class AvatarUploaderDirective {
  private logger: LoggerService;

  constructor(private modalService: NgbModal,
              private alertService: AlertService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('AvatarUploaderDirective');
  }

  @HostListener('change', ['$event'])
  public inputChanged = (event: HTMLSelectElement): void => {
    const imageMaxSizeByte = 3000000;

    if (event.target.files[0].size < imageMaxSizeByte) {
      if (event.target.value) {
        const reader = new FileReader();
        reader.onload = (): void => {
          this.modalService.open(ImageCropModalComponent).componentInstance.imgSrc = reader.result;
        };
        reader.onerror = (err: ErrorEvent): void => {
          this.logger.error('Can not read file', err);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        };

        reader.readAsDataURL(event.target.files[0]);
      }
    } else {
      this.logger.error('Too big file');
      this.alertService.pushDangerAlert('EDIT_PROFILE.IMAGE_CROP.ERROR.TOO_BIG_SIZE');
    }
  }

  @HostListener('click', ['$event'])
  public inputClick = (event: HTMLSelectElement): void => {
    if (event.target.value) {
      event.target.value = '';
    }
  }
}
