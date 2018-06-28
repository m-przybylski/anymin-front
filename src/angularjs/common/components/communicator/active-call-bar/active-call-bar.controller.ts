import { ActiveCallBarService } from './active-call-bar.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export class ActiveCallBarComponentController implements ng.IController, ng.IOnInit, ng.IOnDestroy {

  public static $inject = ['activeCallBarService'];

  public isCallPendingOnOtherDevice = false;

  private ngUnsubscribe = new Subject<void>();

  constructor(private activeCallBarService: ActiveCallBarService) {
  }

  public $onInit(): void {
    this.activeCallBarService.hideCallBar$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.hideCallBar);
    this.activeCallBarService.showCallBar$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.showCallBar);
  }

  public $onDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public pullCall = (): void => {
    this.activeCallBarService.pullCall();
  }

  private hideCallBar = (): void => {
    this.isCallPendingOnOtherDevice = false;
  }

  private showCallBar = (): void => {
    this.isCallPendingOnOtherDevice = true;
  }
}
