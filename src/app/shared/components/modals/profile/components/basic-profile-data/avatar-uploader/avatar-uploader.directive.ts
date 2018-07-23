import { Directive, HostListener, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { ImageCropModalComponent } from '../image-crop/image-crop.component';
import {
  ContentHeightAnimationService
}
  from '../../../../../../services/animation/content-height/content-height.animation.service';
import { Config } from '../../../../../../../../config';

@Directive({
  selector: '[appAvatarUploader]'
})
export class AvatarUploaderDirective {

  @Input()
  public onAvatarError: (isError: boolean) => void;
  private logger: LoggerService;
  private isError = false;

  constructor(private modalService: NgbModal,
              private alertService: AlertService,
              private contentHeightService: ContentHeightAnimationService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('AvatarUploaderDirective');
  }

  @HostListener('change', ['$event'])
  public inputChanged = (event: HTMLSelectElement): void => {
    if (event.target.files[0].size < Config.imageSizeInBytes.imageCropMaxSize) {
      this.contentHeightService.getPreviousHeight$().next('0');
      this.isError = false;
      this.onAvatarError(this.isError);
      if (event.target.value) {
        const reader = new FileReader();
        reader.onload = (): void => {
          this.modalService.open(ImageCropModalComponent).componentInstance.cropModalData = {
            imgSrc: reader.result,
            file: event.target.files[0]
          };
        };
        reader.onerror = (err: ErrorEvent): void => {
          this.logger.error('Can not read file', err);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        };

        reader.readAsDataURL(event.target.files[0]);
      }
    } else {
      this.isError = true;
      this.onAvatarError(this.isError);
      this.logger.warn('Too big file');
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
