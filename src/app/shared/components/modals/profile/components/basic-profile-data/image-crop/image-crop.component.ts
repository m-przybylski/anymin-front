// tslint:disable:no-implicit-dependencies
import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { CropDetails } from '@anymind-ng/api/model/cropDetails';
import { PostFileDetails } from '@anymind-ng/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponentService } from '../../../edit-profile/edit-profile.component.service';
import { Alerts, AlertService, WindowRef, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { HttpErrorResponse } from '@angular/common/http';
import * as Croppie from 'croppie';
import { ModalContainerWidthEnum } from '../../../../modal/modal.component';
import { PreloaderContentSizeEnum } from '../../../../../preloader/preloader-container.component';
import { Config } from '../../../../../../../../config';
import { UploaderService } from '../../../../../../services/uploader/uploader.service';

export interface IImageCropData {
  imgSrc: string;
  file: File;
}

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.sass']

})
export class ImageCropModalComponent implements OnInit, OnDestroy {

  @Input()
  public cropModalData: IImageCropData;

  public modalClass: ModalContainerWidthEnum = ModalContainerWidthEnum.CROPP_WIDTH;
  public isPending = false;
  public preloaderType = PreloaderContentSizeEnum.FULL_CONTENT;

  private readonly mobileResolution = Config.screenWidth.mobile;
  private readonly largeMobileResolution = Config.screenWidth.mobileLarge;
  private croppieElement: Croppie;
  private logger: LoggerService;
  private croppieResolution = this.largeMobileResolution;

  constructor(private el: ElementRef,
              private activeModal: NgbActiveModal,
              private uploaderService: UploaderService,
              private alertService: AlertService,
              private windowRef: WindowRef,
              private editProfileModalComponentService: EditProfileModalComponentService,
              loggerFactory: LoggerFactory) {

    this.logger = loggerFactory.createLoggerService('ImageCropModalComponent');
  }

  @HostListener('input', ['$event'])
  public onInputRangeChange = (event: HTMLSelectElement): void => {
    this.onZoomChange(event.target.value);
  }

  public ngOnDestroy(): void {
    this.croppieElement.destroy();
  }

  public ngOnInit(): void {
    this.assignCroppieWidth();

    this.croppieElement = new Croppie(this.el.nativeElement.querySelector('.image-crop__container'), {
        viewport: {
          width: 190,
          height: 190
        },
        mouseWheelZoom: false,
        showZoomer: false,
        boundary: {
          width: this.croppieResolution,
          height: 352
        }
      },
    );

    this.croppieElement.bind({
      url: this.cropModalData.imgSrc,
      zoom: 0.5
    }).catch((error) => {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.error('Can not bind croppie', error);
    });
  }

  public onModalClose = (): void => this.activeModal.close();

  public onImgUrlSubmit = (): void => {
    this.uploadFile();
  }

  private assignCroppieWidth = (): void => {
    (this.windowRef.nativeWindow.innerWidth <= Config.screenWidth.mobileLarge) ?
      this.croppieResolution = this.mobileResolution :
      this.croppieResolution = this.largeMobileResolution;
  }

  private onZoomChange = (value: number): void => this.croppieElement.setZoom(value);

  private uploadFile = (): void => {
    const croppieCords = this.assignCroppieCords();
    this.isPending = true;

    this.uploaderService.uploadFile(this.cropModalData.file, {
        fileType: PostFileDetails.FileTypeEnum.PROFILE,
        croppingDetails: croppieCords
      }
    ).then(response => {
      this.editProfileModalComponentService.getPreviousAvatarSrc().next(response.previews[0]);
      this.isPending = false;
      this.onModalClose();
    })
      .catch(err => this.handleUploadFileError(err));
  }

  private assignCroppieCords = (): CropDetails => {
    const points = this.croppieElement.get().points;
    const indexOfPointCordX = 0;
    const indexOfPointCordY = 1;
    const indexOfPointWidth = 2;
    const indexOfPointHeight = 3;

    if (points !== undefined) {
      return {
        x: Number(points[indexOfPointCordX]),
        y: Number(points[indexOfPointCordY]),
        width: Number(points[indexOfPointWidth]) - Number(points[indexOfPointCordX]),
        height: Number(points[indexOfPointHeight]) - Number(points[indexOfPointCordY])
      };
    } else {
      return {x: 0, y: 0, width: 0, height: 0};
    }
  }

  private handleUploadFileError = (error: HttpErrorResponse): void => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.warn('Can not upload image', error);
    this.isPending = false;
  }
}
