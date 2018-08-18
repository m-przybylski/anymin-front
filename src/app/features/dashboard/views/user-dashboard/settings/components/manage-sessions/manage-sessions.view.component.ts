import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ModalContainerWidthEnum } from '../../../../../../../shared/components/modals/modal/modal.component';
import {
  ActiveSessionDeviceTypeEnum, IActiveSession,
  ManageSessionsViewComponentService
} from './manage-sessions.view.component.service';
import { Subject } from 'rxjs/Rx';
import { takeUntil, finalize } from 'rxjs/operators';
import {
  ModalAnimationComponentService
} from '../../../../../../../shared/components/modals/modal/animation/modal-animation.animation.service';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { UserSessionService } from '../../../../../../../core/services/user-session/user-session.service';
import { Animations } from '../../../../../../../shared/animations/animations';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'plat-manage-sessions',
  templateUrl: './manage-sessions.view.component.html',
  styleUrls: ['./manage-sessions.view.component.sass'],
  providers: [ManageSessionsViewComponentService],
  animations: [Animations.fadeOut]
})
export class ManageSessionsViewComponent implements OnDestroy, AfterViewInit {

  public readonly modalWidth = ModalContainerWidthEnum.SMALL_WIDTH;
  public activeSessions: ReadonlyArray<IActiveSession> = [];
  public deviceTypes: typeof ActiveSessionDeviceTypeEnum = ActiveSessionDeviceTypeEnum;

  private currentSessionApiKey: string;
  private ngUnsubscribe$ = new Subject<void>();
  private logger: LoggerService;

  constructor(private manageSessionsService: ManageSessionsViewComponentService,
              private modalAnimationComponentService: ModalAnimationComponentService,
              private userSessionService: UserSessionService,
              private alertService: AlertService,
              private activeModal: NgbActiveModal,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('ManageSessionsViewComponent');
    this.userSessionService.getSession()
      .then(currentSession => {
        this.currentSessionApiKey = currentSession.session.apiKey;
      })
      .catch(error => {
        this.logger.warn('error when try to get session', error);
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        this.activeModal.close();
      });

    // TODO in new Angular WebSocketService subscribe on event 'onSessionDeleted'
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.isPendingRequest().next(true);
    this.manageSessionsService.getActiveSessions()
      .pipe(finalize(() => {
        this.modalAnimationComponentService.isPendingRequest().next(false);
      }))
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
      this.manageSessionsService.logoutCurrentSession()
        .then(() => {
          this.removeSessionFromList(apiKey);
        })
        .catch(() => {
          this.logger.info('handled logout error');
        });
    } else {
      this.manageSessionsService.logoutSession(apiKey)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(() => {
          this.removeSessionFromList(apiKey);
        });
    }
  }

  private removeSessionFromList = (apiKey: string): void => {
    this.activeSessions = this.activeSessions.filter(session => session.apiKey !== apiKey);
  }

}
