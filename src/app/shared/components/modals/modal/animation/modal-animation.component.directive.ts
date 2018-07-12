import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ModalAnimationComponentService } from './modal-animation.animation.service';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[modalAnimationComponent]'
})
export class ModalAnimationComponentDirective implements OnDestroy, AfterViewInit {
  private currentHeight: string;
  private prevHeight: string;
  private ngUnsubscribe$ = new ReplaySubject<string>(1);

  constructor(private element: ElementRef,
              private modalAnimationComponentService: ModalAnimationComponentService) {
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onChangeModalContent = (): void => {
    this.modalAnimationComponentService.getPreviousHeight$().next(this.prevHeight);
  }

  public onResponse = (): void => {
    this.createAnimationOnEvent();
  }

  public ngAfterViewInit(): void {
    this.currentHeight = this.getElementHeight();
    this.modalAnimationComponentService.getPreviousHeight$().next(this.currentHeight);
    this.prevHeight = this.currentHeight;
  }

  private getElementHeight = (): string =>
    this.element.nativeElement.clientHeight

  private createAnimationOnEvent = (): void => {
    this.modalAnimationComponentService.getPreviousHeight$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe();
  }
}
