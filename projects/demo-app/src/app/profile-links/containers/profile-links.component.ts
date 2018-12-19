import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'profile-link',
  template: `
    <plat-profile-links [formControl]="links"></plat-profile-links>
    {{ linksAr }}
  `,
})
export class ProfileLinkTestingComponent implements OnInit {
  public linksAr = [];
  public links = new FormControl();
  public fg = new FormGroup({
    links: this.links,
  });

  public ngOnInit() {
    this.links.valueChanges.subscribe(links => {
      this.linksAr = links;
    });
  }
}
