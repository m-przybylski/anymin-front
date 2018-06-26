import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { NgxImgComponent, NgxImgService } from 'ngx-img';
import { ModalContainerWidthEnum } from '../../../../modals/modal/modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponentService } from '../../edit-profile.component.service';
import { Alerts, AlertService } from '@anymind-ng/components';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { PreloaderContentSizeEnum } from '../../../../preloader/preloader-container.component';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.sass'],
  providers: [NgxImgService]

})
export class ImageCropModalComponent implements AfterViewInit, OnDestroy {

  public modalClass = ModalContainerWidthEnum.CROPP_WIDTH;
  public isPending = true;
  public readonly isCloseButtonVisible = false;
  public readonly preloaderContentSize = PreloaderContentSizeEnum.FULL_CONTENT;
  public readonly cropConfig = {
    crop: [{ratio: 1, width: 190, height: 190}],
    height: 190,
    maxWidth: 190,
    maxHeight: 190,
    minWidth: 190,
    minHeight: 190,
    fileType: ['image/gif', 'image/jpeg', 'image/png', 'image/jpg']
  };

  @Input()
  public imgSrc: string;

  @ViewChild('cropper')
  public cropper: NgxImgComponent;

  private cropImgSrc: string;
  private logger: LoggerService;

  constructor(private activeModal: NgbActiveModal,
              private alertService: AlertService,
              private editProfileModalComponentService: EditProfileModalComponentService,
              private cropService: NgxImgService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('ImageCropModalComponent');
  }

  public ngOnDestroy(): void {
    this.cropper.ngOnDestroy();
  }

  public ngAfterViewInit(): void {
    this.cropper.config = this.cropConfig;

    setTimeout(() => {
      this.cropper.ngOnInit();
      this.cropper.imgSrc = this.imgSrc;
      this.cropper.mode = 'crop';
    });
  }

  public onImageSelect = (imgValue: string): void => {
    this.cropService.compress(imgValue, this.cropConfig).then((imgSrc: string) => {
      this.cropImgSrc = imgSrc;
      this.isPending = false;
    }).catch(() => {
      this.isPending = false;
      this.logger.error('Can not select image');
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    });
  }

  public onModalClose = (): void =>
    this.activeModal.close()

  public onImgUrlSubmit = (): void => {
    this.editProfileModalComponentService.getPreviousAvatarSrc().next(this.cropImgSrc);
    this.onModalClose();
  }

}
