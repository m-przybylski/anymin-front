// tslint:disable:no-empty
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Animations } from '@anymind-ng/core';

@Component({
  selector: 'plat-company-activities',
  templateUrl: './activities.view.component.html',
  styleUrls: ['./activities.view.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: Animations.addItemAnimation,
})
export class CompanyActivitiesComponent {}
