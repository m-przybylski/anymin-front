import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[smoothScroll]',
})
export class SmoothScrollDirective implements OnInit {
  public readonly halfDivider = 2;
  public scrollHeight: number;
  public desktopHeight: number;
  public currentHeight: number;
  public currentItemIndex = 1;

  @Output()
  public onLoadMore = new EventEmitter<number>();

  @Input()
  public maxCountElements: number;

  @Input()
  public currentLimit: number;

  constructor(private element: ElementRef) {}

  @HostListener('scroll', ['$event'])
  // It should have type: IntersectionObserver, but safari do not support it.
  // We do not want to install polyfill for this.
  // tslint:disable-next-line:no-any
  public onArrowBottomDown(event: any): void {
    const currentScrollPosition = event.target.scrollTop;
    this.updateScrollPosition(currentScrollPosition);
  }

  @HostListener('window:resize', ['$event'])
  public onWindowResize(): void {
    this.initDefaultParams();
  }

  public ngOnInit(): void {
    this.initDefaultParams();
    this.currentItemIndex = this.currentLimit;
    this.element.nativeElement.scrollTop = 0;
  }

  private initDefaultParams(): void {
    this.desktopHeight = this.element.nativeElement.clientHeight;
    this.updateScrollElementHeight();
  }

  private updateScrollPosition(currentScrollHeight: number): void {
    const scrollPositionToLoadMore = this.desktopHeight + currentScrollHeight + this.desktopHeight / this.halfDivider;

    if (this.maxCountElements !== this.currentItemIndex && scrollPositionToLoadMore >= this.scrollHeight) {
      this.currentHeight = this.scrollHeight;
      this.currentItemIndex += 1;
      this.onLoadMore.emit(this.currentItemIndex);
      this.updateScrollElementHeight();
    }
  }

  private updateScrollElementHeight(): number {
    return (this.scrollHeight = this.element.nativeElement.scrollHeight);
  }
}
