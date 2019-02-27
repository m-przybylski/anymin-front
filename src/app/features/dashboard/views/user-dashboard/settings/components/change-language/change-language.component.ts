import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { ChangeLanguageComponentService } from '@platform/features/dashboard/views/user-dashboard/settings/components/change-language/change-language.component.service';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Config } from 'config';
import { IDropdownComponent } from '@platform/shared/components/dropdown/dropdown.component';
import { TranslateService } from '@ngx-translate/core';
import * as SessionApiActions from '@platform/core/actions/session-api.actions';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';

@Component({
  selector: 'plat-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.sass'],
  providers: [ChangeLanguageComponentService],
})
export class ChangeLanguageComponent extends Logger implements OnInit {
  public readonly changeLanguageFormId = 'languageForm';
  public readonly changeLanguageControlName = 'language';
  public readonly currencyControlName = 'currency';
  public readonly modalWidth = ModalContainerTypeEnum.SMALL_WIDTH;

  public changeLanguageForm: FormGroup;
  public isRequestPending = false;
  public isSubmitButtonDisabled = false;
  public isInputRequired = true;
  public currencies: ReadonlyArray<IDropdownComponent> = [];
  public languages: ReadonlyArray<IDropdownComponent> = Object.values(Config.languages).map(language => ({
    name: this.translate.instant(language),
  }));

  constructor(
    private modalAnimationComponentService: ModalAnimationComponentService,
    private changeLanguageComponentService: ChangeLanguageComponentService,
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private translate: TranslateService,
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ChangeLanguageComponent'));
  }

  public ngOnInit(): void {
    this.changeLanguageForm = new FormGroup({});
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.onModalContentChange().next(false);
    this.changeLanguageComponentService.currentData.subscribe(data => {
      this.changeLanguageForm.controls[this.changeLanguageControlName].setValue(
        this.translate.instant(Object.create(Config.languages)[data.language]),
      );
      this.changeLanguageForm.controls[this.currencyControlName].setValue(data.currency);
    });
  }

  public onFormSubmit(changeLanguageForm: FormGroup): void {
    const languageISOKey = Object.keys(Config.languages).find(
      key =>
        this.translate.instant(Object.create(Config.languages)[key]) ===
        changeLanguageForm.controls[this.changeLanguageControlName].value,
    );
    if (languageISOKey) {
      this.changeLanguageComponentService.updateLanguage(languageISOKey).subscribe(
        account => {
          this.store.dispatch(new SessionApiActions.UpdateAccountInSession(account));
          this.activeModal.close();
        },
        error => {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.loggerService.warn(error);
        },
      );
    } else {
      this.loggerService.error('Language key does not exist');
    }
  }
}
