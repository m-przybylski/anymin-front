import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'profile-link',
  template: `
    <plat-profile-links [formControl]="links"></plat-profile-links>
    {{ linksArray }}
  `,
})
export class ProfileLinkTestingComponent implements OnInit {
  public linksArray = [];
  public links = new FormControl();

  public ngOnInit() {
    this.links.valueChanges.subscribe(links => {
      this.linksArray = links;
    });
  }
}
