import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Config } from '../../../../../../../src/config';

@Component({
  selector: 'plat-file-preview-navigation',
  templateUrl: './file-preview-navigation.component.html',
  styleUrls: ['./file-preview-navigation.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilePreviewNavigationComponent implements OnInit {
  public isZoomInAllowed = true;
  public isZoomOutAllowed = true;
  public isNavigationBackwardAllowed = false;
  public isNavigationForwardAllowed = true;
  public currentZoom = 0;

  @Input()
  public isScalable = false;

  @Input()
  public set currentZoomValue(value: number) {
    this.currentZoom = value;
    this.checkZoomAvailbility();
  }

  @Input()
  public imageUrl: string;
  @Input()
  public filesCount = 0;
  @Input()
  public isZoomAble = true;
  @Input()
  public isPending = true;
  @Output()
  public onZoomEmiter = new EventEmitter<number>();
  @Output()
  public onChangeFileEmiter = new EventEmitter<number>();
  @Output()
  public onPrintEmiter = new EventEmitter<void>();

  public currentItem = 1;

  private readonly maxZoomCount = 200;
  private readonly minZoomCount = 50;
  private readonly zoomIterator = 25;

  @HostListener('document:keydown.arrowDown', ['$event'])
  public onArrowBottomDown(): void {
    this.onZoomOutClick();
  }

  @HostListener('document:keydown.arrowUp', ['$event'])
  public onArrowTopDown(): void {
    this.onZoomInClick();
  }

  @HostListener('document:keydown.arrowRight', ['$event'])
  public onArrowRightDown(): void {
    this.onForwardClick();
  }

  @HostListener('document:keydown.arrowLeft', ['$event'])
  public onArrowLeftDown(): void {
    this.onBackwardClick();
  }

  @HostListener('document:keydown', ['$event'])
  public onKeydownEvents(e: KeyboardEvent): void {
    switch (e.keyCode) {
      case Config.keyboardCodes.plus:
        this.onZoomInClick();
        break;

      case Config.keyboardCodes.numericPlus:
        this.onZoomInClick();
        break;

      case Config.keyboardCodes.minus:
        this.onZoomOutClick();
        break;

      case Config.keyboardCodes.numericMinus:
        this.onZoomOutClick();
        break;

      default:
        return;
    }
  }

  public ngOnInit(): void {
    this.checkZoomAvailbility();
    this.checkNavigationAvailbility();
  }

  public onBackwardClick = (): void => {
    if (this.isNavigationBackwardAllowed) {
      this.onChangeFile((this.currentItem -= 1));
    }
  };

  public onForwardClick = (): void => {
    if (this.isNavigationForwardAllowed) {
      this.onChangeFile((this.currentItem += 1));
    }
  };

  public onZoomInClick = (): void => {
    if (this.currentZoom !== this.maxZoomCount && this.isZoomInAllowed && this.isScalable) {
      this.currentZoom += this.zoomIterator;
      this.checkZoomAvailbility();
      this.onZoomEmiter.emit(this.currentZoom);
    }
  };

  public onZoomOutClick = (): void => {
    if (this.currentZoom !== this.minZoomCount && this.isZoomOutAllowed && this.isScalable) {
      this.currentZoom -= this.zoomIterator;
      this.checkZoomAvailbility();
      this.onZoomEmiter.emit(this.currentZoom);
    }
  };

  public onPrintClick = (): void => {
    this.onPrintEmiter.emit();
  };

  private onChangeFile = (currentItem: number): void => {
    this.currentItem = currentItem;
    this.onChangeFileEmiter.emit(currentItem);
    this.checkNavigationAvailbility();
  };

  private checkZoomAvailbility = (): void => {
    this.isZoomInAllowed = this.currentZoom !== this.maxZoomCount && this.isZoomAble;
    this.isZoomOutAllowed = this.currentZoom !== this.minZoomCount && this.isZoomAble;
  };

  private checkNavigationAvailbility = (): void => {
    this.isNavigationBackwardAllowed = this.currentItem !== 1;
    this.isNavigationForwardAllowed = this.currentItem !== this.filesCount;
  };
}
