import { Component, Inject, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Logger } from '@platform/core/logger';
import {
  IFooterOutput,
  CONSULTATION_FOOTER_DATA,
  IConsultationFooterData,
} from '@platform/shared/components/modals/consultation-details/consultation-footers/consultation-footer-helpers';
import { Observable, Subject } from 'rxjs';
import { LoggerFactory, MoneyToAmount } from '@anymind-ng/core';
import { ConsultationDetailsActionsService } from '@platform/shared/components/modals/consultation-details/consultation-details-actions.service';

enum MiddlePanelStatusTypes {
  expert,
  organization,
  organizationFreelance,
}

@Component({
  selector: 'plat-consultation-footer-edit',
  templateUrl: 'consultation-footer-edit.component.html',
  styleUrls: ['consultation-footer-edit.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultationFooterEditComponent extends Logger implements IFooterOutput, OnDestroy {
  public middlePanelStatusTypes = MiddlePanelStatusTypes;
  public get actionTaken$(): Observable<keyof ConsultationDetailsActionsService> {
    return this._actionTaken$.asObservable();
  }

  public get grossPrice(): string {
    if (this.data.price === undefined) {
      return '';
    }

    return this.moneyPipe.transform(this.data.price && this.data.price);
  }

  public get organizationPrice(): string {
    if (this.data.getCommissions.partnerAmount === undefined) {
      return '';
    }

    return this.moneyPipe.transform(this.data.getCommissions.partnerAmount);
  }

  public get expertPrice(): string {
    return this.moneyPipe.transform(this.data.getCommissions.profileAmount);
  }

  public get middlePanel(): MiddlePanelStatusTypes {
    if (this.data.isFreelance) {
      return MiddlePanelStatusTypes.organizationFreelance;
    }
    if (this.data.expertsIdList.length === 1) {
      return MiddlePanelStatusTypes.expert;
    }

    return MiddlePanelStatusTypes.organization;
  }

  private _actionTaken$ = new Subject<keyof ConsultationDetailsActionsService>();
  private moneyPipe = new MoneyToAmount(this.loggerService);

  constructor(@Inject(CONSULTATION_FOOTER_DATA) public data: IConsultationFooterData, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('ConsultationFooterEditComponent'));
  }

  public ngOnDestroy(): void {
    this._actionTaken$.complete();
  }

  public onEdit(): void {
    this._actionTaken$.next('editConsultation');
  }

  public onShare(): void {
    this._actionTaken$.next('share');
  }
}
