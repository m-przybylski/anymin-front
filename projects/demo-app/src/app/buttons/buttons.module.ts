import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ButtonTestingComponent } from './containers/buttons.component';
import { ButtonModule } from '@platform/shared/components/atomic-components';
const routes: Routes = [
  {
    path: 'buttons',
    component: ButtonTestingComponent,
  },
];
@NgModule({
  imports: [ButtonModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [ButtonTestingComponent],
})
export class ButtonTestingModule {}
