// tslint:disable:no-empty
import { Subject, ReplaySubject } from 'rxjs';
import { ContentHeightAnimationService } from '@platform/shared/services/animation/content-height/content-height.animation.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ModalAnimationComponentService {
  private isPending$ = new Subject<boolean>();
  private isChanged$ = new Subject<boolean>();
  private height$ = new ReplaySubject<string>(1);

  constructor(private contentHeightService: ContentHeightAnimationService) {}

  public onModalContentChange(): Subject<boolean> {
    return this.isChanged$;
  }

  public isPendingRequest(): Subject<boolean> {
    return this.isPending$;
  }

  public getPreviousHeight$(): ReplaySubject<string> {
    return this.height$;
  }

  public startLoadingAnimation(): void {
    this.isChanged$.next(true);
  }

  public stopLoadingAnimation(initialHeight?: string): void {
    this.isChanged$.next(false);
    if (typeof initialHeight !== 'undefined') {
      this.contentHeightService.getPreviousHeight$().next(initialHeight);
    }
  }
}
