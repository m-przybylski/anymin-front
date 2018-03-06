import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnsupportedComponent } from './unsupported.component';

const routes: Routes = [
  { path: '', component: UnsupportedComponent }
];

export const UnsupportedRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
