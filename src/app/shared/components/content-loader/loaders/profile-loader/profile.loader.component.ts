import { Component } from '@angular/core';
import { ContentLoaderComponent } from '../../content-loader.component';

@Component({
  selector: 'plat-profile-loader',
  templateUrl: 'profile.loader.component.html',
  styleUrls: ['profile.loader.component.sass'],
})
export class ProfileLoaderComponent extends ContentLoaderComponent {}
