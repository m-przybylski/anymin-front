import { Subject, Observable } from 'rxjs';

export class StickyModalFooterService {
  private onStartSticky$ = new Subject<number>();

  public get newAnimationEvent$(): Observable<number> {
    return this.onStartSticky$.asObservable();
  }

  public pushAnimationEvent(contentHeight: number): void {
    this.onStartSticky$.next(contentHeight);
  }
}
