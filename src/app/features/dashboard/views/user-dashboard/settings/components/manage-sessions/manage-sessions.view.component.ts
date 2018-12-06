import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import {
  ActiveSessionDeviceTypeEnum,
  IActiveSession,
  ManageSessionsViewComponentService,
} from './manage-sessions.view.component.service';
import { Subject } from 'rxjs';
import { takeUntil, finalize, map, take } from 'rxjs/operators';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Animations } from '@platform/shared/animations/animations';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';

@Component({
  selector: 'plat-manage-sessions',
  templateUrl: './manage-sessions.view.component.html',
  styleUrls: ['./manage-sessions.view.component.sass'],
  providers: [ManageSessionsViewComponentService],
  animations: [Animations.fadeOut],
})
export class ManageSessionsViewComponent implements OnDestroy, AfterViewInit {
  public readonly modalWidth = ModalContainerTypeEnum.SMALL_WIDTH;
  public activeSessions: ReadonlyArray<IActiveSession> = [];
  public deviceTypes: typeof ActiveSessionDeviceTypeEnum = ActiveSessionDeviceTypeEnum;

  private currentSessionApiKey: string;
  private ngUnsubscribe$ = new Subject<void>();
  private logger: LoggerService;

  constructor(
    private manageSessionsService: ManageSessionsViewComponentService,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private store: Store<fromRoot.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('ManageSessionsViewComponent');
    getNotUndefinedSession(this.store)
      .pipe(
        map(session => session.session.apiKey),
        take(1),
      )
      .subscribe(apiKey => {
        this.currentSessionApiKey = apiKey;
      });
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.isPendingRequest().next(true);
    this.manageSessionsService
      .getActiveSessions()
      .pipe(
        finalize(() => {
          this.modalAnimationComponentService.isPendingRequest().next(false);
        }),
      )
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(activeSessions => {
        this.activeSessions = activeSessions;
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onLogoutSession = (apiKey: string): void => {
    if (this.currentSessionApiKey === apiKey) {
      this.manageSessionsService.logoutCurrentSession();
    } else {
      this.manageSessionsService
        .logoutSession(apiKey)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(() => {
          this.removeSessionFromList(apiKey);
        });
    }
  };

  private removeSessionFromList = (apiKey: string): void => {
    this.activeSessions = this.activeSessions.filter(session => session.apiKey !== apiKey);
  };
}
