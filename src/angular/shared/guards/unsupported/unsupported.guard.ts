import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

const DetectRTC = require('detectrtc');

@Injectable()
export class UnsupportedGuard implements CanActivate {

  constructor(private router: Router) {
  }

  public canActivate(): boolean {
    if (DetectRTC.osName === 'iOS' && DetectRTC.browser.isChrome || DetectRTC.browser.isSafari) {
      this.router.navigate(['/unsupported']);
      return false;
    }
    return true;
  }

}
