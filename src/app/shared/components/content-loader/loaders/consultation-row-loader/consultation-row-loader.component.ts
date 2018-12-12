import { Component } from '@angular/core';
import { ContentLoaderComponent } from '../../content-loader.component';

@Component({
  selector: 'plat-consultation-row-loader',
  templateUrl: './consultation-row-loader.component.html',
  styleUrls: ['./consultation-row-loader.component.sass'],
})
export class ConsultationLoaderComponent extends ContentLoaderComponent {}
