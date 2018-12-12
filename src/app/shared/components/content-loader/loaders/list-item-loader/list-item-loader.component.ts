import { Component } from '@angular/core';
import { ContentLoaderComponent } from '../../content-loader.component';

@Component({
  selector: 'plat-list-item-loader',
  templateUrl: './list-item-loader.component.html',
  styleUrls: ['./list-item-loader.component.sass'],
})
export class ListItemLoaderComponent extends ContentLoaderComponent {}
