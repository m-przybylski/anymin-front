import { Component } from '@angular/core';

@Component({
  selector: 'plat-company-dashboard',
  templateUrl: './company-dashboard.view.component.html',
  styleUrls: ['./company-dashboard.view.component.sass']
})
export class CompanyDashboardComponent {

  public readonly isCompany = true;

  constructor() {
  }

}
