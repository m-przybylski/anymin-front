import { Injectable, Injector } from '@angular/core';
import {
  IS_EXPERT_FORM,
  SHOW_TOGGLE_EXPERT,
} from '@platform/shared/components/modals/profile/create-profile/create-profile.component';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AuthActions } from '@platform/core/actions';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import { ProfileModalsService } from '@platform/shared/components/modals/profile/profile-modals/profile-modals.service';
import { take } from 'rxjs/operators';

export interface INavbarUserMenuPayload {
  store: Store<fromRoot.IState>;
}

@Injectable()
export class NavbarUserMenuService {
  constructor(private profileModalsService: ProfileModalsService) {}

  public openCreateProfileModalAsExpert(): void {
    const options: NgbModalOptions = {
      injector: Injector.create({
        providers: [{ provide: IS_EXPERT_FORM, useValue: true }, { provide: SHOW_TOGGLE_EXPERT, useValue: true }],
      }),
    };
    this.profileModalsService
      .openCreateExpertModal(options)
      .pipe(take(1))
      .subscribe();
  }

  public openCreateOrganizationModal(): void {
    this.profileModalsService
      .openCreateCompanyModal()
      .pipe(take(1))
      .subscribe();
  }

  public logout({ store }: INavbarUserMenuPayload): void {
    store.dispatch(new AuthActions.LogoutAction());
  }
}
