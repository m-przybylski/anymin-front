// tslint:disable:no-empty
import { NgModule } from '@angular/core';
import { ConfirmEmailComponent } from './confirm-email.component';
import { ConfirmEmailGuard } from './confirm-email.guard';

@NgModule({
  declarations: [
    ConfirmEmailComponent
  ],
  providers: [
    ConfirmEmailGuard
  ]
})
export class ConfirmEmailModule {

  constructor() {
  }
}
