// tslint:disable:no-implicit-dependencies
import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { UploaderService } from '../../../../../services/uploader/uploader.service';
import { CropDetails } from '@anymind-ng/api/model/cropDetails';
import { PostFileDetails } from '@anymind-ng/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponentService } from '../../edit-profile.component.service';
import { ModalContainerWidthEnum } from '../../../../modals/modal/modal.component';
import { Alerts, AlertService, WindowRef } from '@anymind-ng/components';
import { HttpErrorResponse } from '@angular/common/http';
import * as Croppie from 'croppie';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Config } from '../../../../../../../config';

export interface IData {
  imgSrc: string;
  file: File;
}

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.sass']

})
export class ImageCropModalComponent implements OnInit, OnDestroy {
  private static readonly mobileResolution = Config.resolutions.mobile;
  private static readonly largeMobileResolution = Config.resolutions.mobileLarge;

  public modalClass: ModalContainerWidthEnum = ModalContainerWidthEnum.CROPP_WIDTH;
  public isPending = false;

  @Input()
  public cropModalData: IData;
  private croppieElement: Croppie;
  private croppingDetails: CropDetails;
  private logger: LoggerService;
  private croppieResolution: number;

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
    this.setCroppieWidth();

    this.croppieElement = new Croppie(this.el.nativeElement.querySelector('.image-crop__container'), {
        viewport: {
          width: 190,
          height: 190
        },
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
    this.setCroppieCords();
    this.uploadFile();
  }

  private setCroppieWidth = (): void => {
    (this.windowRef.nativeWindow.innerWidth <= Config.resolutions.mobileLarge) ?
      this.croppieResolution = ImageCropModalComponent.mobileResolution :
      this.croppieResolution = ImageCropModalComponent.largeMobileResolution;
  }

  private onZoomChange = (value: number): void => this.croppieElement.setZoom(value);

  private uploadFile = (): void => {
    this.isPending = true;

    this.uploaderService.uploadFile(this.cropModalData.file, {
        fileType: PostFileDetails.FileTypeEnum.PROFILE,
        croppingDetails: this.croppingDetails
      }
    ).then(response => {
      this.editProfileModalComponentService.getPreviousAvatarSrc().next(response.previews[0]);
      this.isPending = false;
      this.onModalClose();
    })
      .catch(err => this.handleUploadFileError(err));
  }

  private setCroppieCords = (): void => {
    const points = this.croppieElement.get().points;
    const pointCordX = 0;
    const pointCordY = 1;
    const pointWidth = 2;
    const pointHeight = 3;

    if (points !== undefined) {
      this.croppingDetails = {
        x: Number(points[pointCordX]),
        y: Number(points[pointCordY]),
        width: Number(points[pointWidth]) - Number(points[pointCordX]),
        height: Number(points[pointHeight]) - Number(points[pointCordY])
      };
    }
  }

  private handleUploadFileError = (error: HttpErrorResponse): void => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.error('Can not upload image', error);
  }
}
