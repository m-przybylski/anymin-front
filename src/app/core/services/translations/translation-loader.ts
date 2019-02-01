import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TranslationAssetsLoader implements TranslateLoader {
  private prefix = '/assets/i18n/';
  private suffix = '.json';
  constructor(private http: HttpClient) {}
  /**
   * Gets the translations external file
   */
  // tslint:disable-next-line:ban-types
  public getTranslation(lang: string): Observable<Object> {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
}
