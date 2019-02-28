import { Injectable, Injector } from '@angular/core';
import {
  IS_EXPERT_FORM,
  SHOW_TOGGLE_EXPERT,
  CreateProfileModalComponent,
} from '@platform/shared/components/modals/profile/create-profile/create-profile.component';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrganizationModalComponent } from '@platform/shared/components/modals/profile/create-organization/create-organization.component';
import { AuthActions } from '@platform/core/actions';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';

export interface INavbarUserMenuPayload {
  store: Store<fromRoot.IState>;
}

@Injectable()
export class NavbarUserMenuService {
  constructor(private modalService: NgbModal) {}

  public openCreateProfileModalAsExpert(): void {
    const options: NgbModalOptions = {
      injector: Injector.create({
        providers: [{ provide: IS_EXPERT_FORM, useValue: true }, { provide: SHOW_TOGGLE_EXPERT, useValue: true }],
      }),
    };

    this.modalService.open(CreateProfileModalComponent, options);
  }

  public openCreateOrganizationModal(): void {
    this.modalService.open(CreateOrganizationModalComponent);
  }

  public logout({ store }: INavbarUserMenuPayload): void {
    store.dispatch(new AuthActions.LogoutAction());
  }
}
