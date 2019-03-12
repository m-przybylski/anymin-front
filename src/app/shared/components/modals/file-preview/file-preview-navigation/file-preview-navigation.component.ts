import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Config } from '@anymind-ng/core';

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
    this.checkZoomAvailability();
  }

  @Input()
  public filesLength = 0;

  @Input()
  public imageUrl: string;
  @Input()
  public isZoomAble = true;
  @Input()
  public isPending = true;
  @Output()
  public zoom = new EventEmitter<number>();
  @Output()
  public changeFile = new EventEmitter<number>();
  @Output()
  public print = new EventEmitter<void>();

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
    switch (e.key) {
      case Config.keyboardCodes.plus:
        this.onZoomInClick();
        break;

      case Config.keyboardCodes.minus:
        this.onZoomOutClick();
        break;

      default:
        return;
    }
  }

  public ngOnInit(): void {
    this.checkZoomAvailability();
    this.checkNavigationAvailability();
  }

  public onBackwardClick(): void {
    if (this.isNavigationBackwardAllowed) {
      this.onChangeFile((this.currentItem -= 1));
    }
  }

  public onForwardClick(): void {
    if (this.isNavigationForwardAllowed) {
      this.onChangeFile((this.currentItem += 1));
    }
  }

  public onZoomInClick(): void {
    if (this.currentZoom !== this.maxZoomCount && this.isZoomInAllowed && this.isScalable) {
      this.currentZoom += this.zoomIterator;
      this.checkZoomAvailability();
      this.zoom.emit(this.currentZoom);
    }
  }

  public onZoomOutClick(): void {
    if (this.currentZoom !== this.minZoomCount && this.isZoomOutAllowed && this.isScalable) {
      this.currentZoom -= this.zoomIterator;
      this.checkZoomAvailability();
      this.zoom.emit(this.currentZoom);
    }
  }

  public onPrintClick(): void {
    this.print.emit();
  }

  private onChangeFile(currentItem: number): void {
    this.currentItem = currentItem;
    this.changeFile.emit(currentItem);
    this.checkNavigationAvailability();
  }

  private checkZoomAvailability(): void {
    this.isZoomInAllowed = this.currentZoom !== this.maxZoomCount && this.isZoomAble;
    this.isZoomOutAllowed = this.currentZoom !== this.minZoomCount && this.isZoomAble;
  }

  private checkNavigationAvailability(): void {
    this.isNavigationBackwardAllowed = this.currentItem !== 1;
    this.isNavigationForwardAllowed = this.currentItem !== this.filesLength;
  }
}
