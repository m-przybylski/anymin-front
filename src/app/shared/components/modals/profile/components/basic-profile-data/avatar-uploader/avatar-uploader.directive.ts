import { Directive, HostListener, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { ImageCropModalComponent } from '../image-crop/image-crop.component';
import { ContentHeightAnimationService } from '../../../../../../services/animation/content-height/content-height.animation.service';
import { Config } from '../../../../../../../../config';

@Directive({
  selector: '[appAvatarUploader]',
})
export class AvatarUploaderDirective {
  /**
   * emits value when file it too large
   * this is only logical check. Does not emit any value if transfer fails.
   */
  @Output()
  public avatarTooLargeError = new EventEmitter<void>();
  /**
   * once new image is loaded new avatarToken is emitted
   */
  @Output()
  public avatarTokenChange = new EventEmitter<string>();
  private logger: LoggerService;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private contentHeightService: ContentHeightAnimationService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('AvatarUploaderDirective');
  }

  @HostListener('change', ['$event'])
  public inputChanged = (event: HTMLSelectElement): void => {
    if (event.target.files[0].size < Config.imageSizeInBytes.imageCropMaxSize) {
      this.contentHeightService.getPreviousHeight$().next('0');
      if (event.target.value) {
        const reader = new FileReader();
        reader.onload = (): void => {
          const modalRef = this.modalService.open(ImageCropModalComponent);
          (modalRef.componentInstance as ImageCropModalComponent).cropModalData = {
            imgSrc: reader.result,
            file: event.target.files[0],
          };
          modalRef.result
            .then(avatarToken => {
              this.avatarTokenChange.emit(avatarToken);
            })
            .catch(() => {
              this.avatarTokenChange.emit('');
            });
        };
        reader.onerror = (err: ErrorEvent): void => {
          this.logger.error('Can not read file', err);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        };

        reader.readAsDataURL(event.target.files[0]);
      }
    } else {
      this.avatarTooLargeError.emit();
      this.logger.warn('Too big file');
      this.alertService.pushDangerAlert('EDIT_PROFILE.IMAGE_CROP.ERROR.TOO_BIG_SIZE');
    }
  };

  @HostListener('click', ['$event'])
  public inputClick = (event: HTMLSelectElement): void => {
    if (event.target.value) {
      event.target.value = '';
    }
  };
}
