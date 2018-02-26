import { Component, OnInit } from '@angular/core';

const DetectRTC = require('detectrtc');

@Component({
  selector: 'unsupported',
  templateUrl: 'unsupported.component.html',
  styleUrls: ['unsupported.component.sass']
})

export class UnsupportedComponent implements OnInit {

  public isChromeLogoVisible: boolean;

  public ngOnInit(): void {
    this.isChromeLogoVisible = DetectRTC.osName !== 'iOS' && !DetectRTC.browser.isChrome;
  }

}
