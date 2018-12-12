import { Subject, Observable } from 'rxjs';

export class StickyModalFooterService {
  private onStartSticky$ = new Subject<void>();

  public get newAnimationEvent$(): Observable<void> {
    return this.onStartSticky$.asObservable();
  }

  public pushAnimationEvent(): void {
    this.onStartSticky$.next();
  }
}
