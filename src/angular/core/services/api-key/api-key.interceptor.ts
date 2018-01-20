import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Config} from '../../../../config';
import {ApiKeyService} from './api-key.service';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor(private apiKeyService: ApiKeyService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers: {[key: string]: string} = {}
    headers[Config.http.apiHeader] = this.apiKeyService.getApiKey() || ''

    request = request.clone({
      setHeaders: headers
    });
    return next.handle(request);
  }
}
