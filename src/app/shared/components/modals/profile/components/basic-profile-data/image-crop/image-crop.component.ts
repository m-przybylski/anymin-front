// tslint:disable:no-implicit-dependencies
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Alerts, AlertService, WindowRef, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalContainerTypeEnum } from '../../../../modal/modal.component';
import { PreloaderContentSizeEnum } from '../../../../../preloader/preloader-container.component';
import { Config } from '../../../../../../../../config';
import * as Croppie from 'croppie';
import { ImageCropService } from '@platform/shared/components/modals/profile/components/basic-profile-data/image-crop/image-crop.service';

export interface IImageCropData {
  imgSrc: string;
  file: File;
}

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.sass'],
  providers: [ImageCropService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCropModalComponent implements OnDestroy, AfterViewInit {
  @Input()
  public cropModalData: IImageCropData;

  public modalClass: ModalContainerTypeEnum = ModalContainerTypeEnum.CROP_WIDTH;
  public isPending = false;
  public preloaderType = PreloaderContentSizeEnum.FULL_CONTENT;

  @ViewChild('imageCroppContainer')
  public imageCroppElement: ElementRef;

  private readonly mobileResolution = Config.screenWidth.mobile;
  private readonly largeMobileResolution = Config.screenWidth.mobileLarge;
  private croppieElement: Croppie;
  private logger: LoggerService;
  private croppieResolution = this.largeMobileResolution;

  constructor(
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private windowRef: WindowRef,
    private imageCropService: ImageCropService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('ImageCropModalComponent');
  }

  @HostListener('input', ['$event'])
  public onInputRangeChange = (event: HTMLSelectElement): void => {
    // @ts-ignore
    this.onZoomChange(event.target.value);
  };

  public ngOnDestroy(): void {
    this.croppieElement.destroy();
  }

  public ngAfterViewInit(): void {
    this.assignCroppieWidth();
    this.croppieElement = new Croppie(this.imageCroppElement.nativeElement, {
      viewport: {
        width: 190,
        height: 190,
      },
      mouseWheelZoom: false,
      showZoomer: false,
      boundary: {
        width: this.croppieResolution,
        height: 352,
      },
    });

    this.croppieElement
      .bind({
        url: this.cropModalData.imgSrc,
        zoom: 0.5,
      })
      .catch((error: Croppie.CropType) => {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        this.logger.error('Can not bind croppie', error);
      });
  }

  public onModalClose(avatarToken = ''): void {
    this.activeModal.close(avatarToken);
  }

  public onImgUrlSubmit(): void {
    this.isPending = true;
    this.imageCropService
      .uploadFile(this.cropModalData, this.croppieElement)
      .then(response => {
        this.isPending = false;
        this.onModalClose(response.token);
      })
      .catch(err => this.handleUploadFileError(err));
  }

  private assignCroppieWidth(): void {
    this.windowRef.nativeWindow.innerWidth <= Config.screenWidth.mobileLarge
      ? (this.croppieResolution = this.mobileResolution)
      : (this.croppieResolution = this.largeMobileResolution);
  }

  private onZoomChange(value: number): void {
    this.croppieElement.setZoom(value);
  }

  private handleUploadFileError(error: HttpErrorResponse): void {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.warn('Can not upload image', error);
    this.isPending = false;
  }
}
