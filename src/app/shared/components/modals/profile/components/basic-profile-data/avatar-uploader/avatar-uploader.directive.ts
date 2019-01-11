import { Directive, HostListener, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { ImageCropModalComponent } from '../image-crop/image-crop.component';
import { ContentHeightAnimationService } from '../../../../../../services/animation/content-height/content-height.animation.service';
import { Config } from '../../../../../../../../config';
import { AvatarErrorEnum } from '@platform/shared/components/modals/profile/components/basic-profile-data/avatar-uploader/avatar-uploader.component';

@Directive({
  selector: '[appAvatarUploader]',
})
export class AvatarUploaderDirective {
  /**
   * emits value when file it too large or has to small dimensions
   * this is only logical check. Does not emit any value if transfer fails.
   */
  @Output()
  public avatarError = new EventEmitter<AvatarErrorEnum>();
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
          this.checkImageDimensions(event, reader);
        };
        reader.onerror = (err: ErrorEvent): void => {
          this.logger.error('Can not read file', err);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        };

        reader.readAsDataURL(event.target.files[0]);
      }
    } else {
      this.avatarError.emit(AvatarErrorEnum.TOO_LARGE);
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

  private checkImageDimensions(event: HTMLSelectElement, reader: FileReader): void {
    const img = new Image();
    img.src = URL.createObjectURL(event.target.files[0]);

    img.onload = (): void => {
      if (this.hasFileMinDimensions(img)) {
        this.openCroppieModal(event, reader);
      } else {
        this.avatarError.emit(AvatarErrorEnum.TOO_SMALL_DIMENSIONS);
      }
    };
  }

  private hasFileMinDimensions = (img: HTMLImageElement): boolean =>
    img.naturalWidth >= Config.avatarDimensions.minWidth && img.naturalHeight >= Config.avatarDimensions.minHeight;

  private openCroppieModal(event: HTMLSelectElement, reader: FileReader): void {
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
  }
}
